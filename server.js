require("dotenv/config");

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const postgres = require("postgres");

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const sql = postgres(connectionString, { prepare: false });

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("รูปแบบ JSON ไม่ถูกต้อง"));
      }
    });
    request.on("error", reject);
  });
}

function mapOrder(row) {
  return {
    id: row.id,
    customer: row.customer,
    menu: row.menu,
    category: row.category,
    cookTimeMinutes: row.cook_time_minutes,
    specialRequest: row.special_request || "",
    status: row.status,
    cookingStartedAt: row.cooking_started_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getOrders() {
  const rows = await sql`
    select
      id,
      customer,
      menu,
      category,
      cook_time_minutes,
      special_request,
      status,
      cooking_started_at,
      created_at,
      updated_at
    from orders
    order by created_at desc, id desc
  `;
  return rows.map(mapOrder);
}

const validStatuses = new Set(["new", "cooking", "qc", "done"]);

function validateOrder(order) {
  const id = String(order.id || "").trim();
  const customer = String(order.customer || "").trim();
  const menu = String(order.menu || "").trim();
  const category = String(order.category || "").trim();
  const cookTimeMinutes = Number(order.cookTimeMinutes);
  const status = String(order.status || "new").trim();

  if (!id || !customer || !menu || !category) {
    throw new Error("กรุณากรอกข้อมูลออเดอร์ให้ครบถ้วน");
  }
  if (!Number.isInteger(cookTimeMinutes) || cookTimeMinutes < 1 || cookTimeMinutes > 999) {
    throw new Error("เวลาปรุงต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 999 นาที");
  }
  if (!validStatuses.has(status)) {
    throw new Error("สถานะออเดอร์ไม่ถูกต้อง");
  }

  return {
    id,
    customer,
    menu,
    category,
    cookTimeMinutes,
    specialRequest: String(order.specialRequest || "").trim(),
    status,
  };
}

async function createOrder(order) {
  const validOrder = validateOrder(order);
  try {
    const rows = await sql`
      insert into orders (
        id,
        customer,
        menu,
        category,
        cook_time_minutes,
        special_request,
        status,
        cooking_started_at
      ) values (
        ${validOrder.id},
        ${validOrder.customer},
        ${validOrder.menu},
        ${validOrder.category},
        ${validOrder.cookTimeMinutes},
        ${validOrder.specialRequest || null},
        ${validOrder.status},
        ${validOrder.status === "cooking" ? new Date() : null}
      )
      returning *
    `;
    return mapOrder(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      const err = new Error(`รหัสออเดอร์ "${validOrder.id}" มีอยู่ในระบบแล้ว กรุณาใช้รหัสออเดอร์อื่น`);
      err.statusCode = 409;
      throw err;
    }
    throw error;
  }
}

async function updateOrderStatus(id, status) {
  const rows = await sql`
    update orders
    set
      status = ${status},
      cooking_started_at = case
        when ${status} = 'cooking' then coalesce(cooking_started_at, now())
        else cooking_started_at
      end,
      updated_at = now()
    where id = ${id}
    returning *
  `;
  return rows[0] ? mapOrder(rows[0]) : null;
}

async function deleteOrder(id) {
  const rows = await sql`
    delete from orders
    where id = ${id}
    returning id
  `;
  return rows[0] || null;
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://localhost:${port}`);

  try {
    if (request.method === "GET" && requestUrl.pathname === "/api/orders") {
      sendJson(response, 200, { orders: await getOrders() });
      return;
    }

    if (request.method === "POST" && requestUrl.pathname === "/api/orders") {
      const order = await readRequestBody(request);
      const createdOrder = await createOrder(order);
      sendJson(response, 201, createdOrder);
      return;
    }

    const statusMatch = requestUrl.pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
    if (request.method === "PATCH" && statusMatch) {
      const body = await readRequestBody(request);
      const updatedOrder = await updateOrderStatus(
        decodeURIComponent(statusMatch[1]),
        body.status,
      );
      if (!updatedOrder) {
        sendJson(response, 404, { message: "ไม่พบออเดอร์" });
        return;
      }
      sendJson(response, 200, updatedOrder);
      return;
    }

    const orderMatch = requestUrl.pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (request.method === "DELETE" && orderMatch) {
      const deletedOrder = await deleteOrder(decodeURIComponent(orderMatch[1]));
      if (!deletedOrder) {
        sendJson(response, 404, { message: "ไม่พบออเดอร์" });
        return;
      }
      sendJson(response, 200, { id: deletedOrder.id });
      return;
    }

    if (request.method !== "GET") {
      sendJson(response, 405, { message: "Method Not Allowed" });
      return;
    }

    const requestedPath = requestUrl.pathname === "/"
      ? "/index.html"
      : requestUrl.pathname;
    const filePath = path.normalize(path.join(root, requestedPath));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500);
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(content);
    });
  } catch (error) {
    console.error(error);
    sendJson(response, error.statusCode || 500, {
      message: error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล",
    });
  }
});

server.listen(port, host, () => {
  console.log(`KitchenPulse running at http://localhost:${port}`);
});

async function shutdown() {
  await sql.end();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
