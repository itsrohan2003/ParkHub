const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/welcome.html' : req.url;
  const filePath = path.join(__dirname, reqPath);
  const contentType = getContentType(filePath);

  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading the file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  if (extname === '.html') {
    return 'text/html';
  } else if (extname === '.css') {
    return 'text/css';
  } else {
    return 'application/octet-stream';
  }
}
