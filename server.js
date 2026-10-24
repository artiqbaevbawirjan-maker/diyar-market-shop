const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // CORS & Clean headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path doesn't have an extension, try appending .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="kaa">
        <head>
          <meta charset="utf-8">
          <title>404 — Бет табылмады | Diyar Market</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; background: #f0fdf1; color: #0d472b; }
            h1 { font-size: 32px; }
            p { font-size: 16px; color: #414942; }
            a { color: #006e2f; font-weight: bold; text-decoration: none; padding: 10px 20px; background: #6bff8f; border-radius: 12px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>404 — Бет табылмады</h1>
          <p>Сиз излеген бет серверде табылмады.</p>
          <a href="/">Басқы бетке қайтыў</a>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Diyar Market Node.js сервери иске түсти!`);
  console.log(`📍 Мәнзил: http://localhost:${PORT}`);
  console.log(`📍 Тармақ мәнзили: http://127.0.0.1:${PORT}`);
  console.log(`📂 Папка: ${PUBLIC_DIR}`);
  console.log(`=======================================================`);
});
