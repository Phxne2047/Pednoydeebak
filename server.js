const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const dataPath = path.join(root, 'data', 'mock-orders.json');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('รูปแบบ JSON ไม่ถูกต้อง')); }
    });
    request.on('error', reject);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://localhost:${port}`);

  if (request.method === 'GET' && requestUrl.pathname === '/api/orders') {
    try {
      sendJson(response, 200, JSON.parse(fs.readFileSync(dataPath, 'utf8')));
    } catch (error) {
      sendJson(response, 500, { message: error.message });
    }
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/orders') {
    try {
      const order = await readRequestBody(request);
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      data.orders.unshift(order);
      fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
      sendJson(response, 201, order);
    } catch (error) {
      sendJson(response, 400, { message: error.message });
    }
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, { message: 'Method Not Allowed' });
    return;
  }

  const requestedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = path.normalize(path.join(root, requestedPath));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(content);
  });
});

server.listen(port, host, () => console.log(`KitchenPulse running at http://localhost:${port}`));
