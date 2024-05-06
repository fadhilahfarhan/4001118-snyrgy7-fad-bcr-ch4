const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public');
const { port = 8080 } = process.env;

function onRequest(req, res) {
  let filePath = path.join(PUBLIC_DIRECTORY, url(req.url));
  const extname = path.extname(filePath);
  let contentType = getContentType(extname);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

function url(url) {
  if (url === '/') {
    return 'index.html';
  } else if (url === '/cars') {
    return 'cariMobil.html';
  } else {
    return url;
  }
}

function getContentType(extname) {
  if (extname === '.js') {
    return 'text/javascript';
  } else if (extname === '.css') {
    return 'text/css';
  } else if (extname === '.png') {
    return 'image/png';
  } else if (extname === '.svg') {
    return 'image/svg+xml';
  } else {
    return 'text/html';
  }
}

const server = http.createServer(onRequest);

server.listen(port, 'localhost', () => {
  console.log('Server Sudah Berjalan di http://localhost:8080');
});
