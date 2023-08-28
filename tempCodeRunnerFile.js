const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const querystring = require('querystring');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '245678@#Rohan',
  database: 'ParkHub'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// ... (Your existing server setup code)

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/map') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const postData = querystring.parse(data);
      const selectedOptionValue = postData.areaID;

      // Redirect to map.html with the selected option value as a query parameter
      res.writeHead(302, { 'Location': `map.html?areaID=${selectedOptionValue}` });
      res.end();
    });
  } else {
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
  }
});

// ... (Your existing server listening code)


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