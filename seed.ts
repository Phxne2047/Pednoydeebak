import { readFile } from "node:fs/promises";
import { db } from "./db";
import { orders } from "./drizzle/schema";

type MockOrder = {
  id: string;
  customer: string;
  menu: string;
  category: string;
  cookTimeMinutes: number;
  specialRequest?: string;
  status: string;
};

type MockOrderData = {
  orders: MockOrder[];
};

async function seed() {
  const source = await readFile(
    new URL("./data/mock-orders.json", import.meta.url),
    "utf8",
  );
  const data = JSON.parse(source) as MockOrderData;

  for (const order of data.orders) {
    await db
      .insert(orders)
      .values(order)
      .onConflictDoUpdate({
        target: orders.id,
        set: {
          customer: order.customer,
          menu: order.menu,
          category: order.category,
          cookTimeMinutes: order.cookTimeMinutes,
          specialRequest: order.specialRequest,
          status: order.status,
          updatedAt: new Date(),
        },
      });
  }

  console.log(`Seeded ${data.orders.length} orders.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
