const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '245678@#Rohan',
  database: 'ParkHub'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/insert') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        const { areaID, name, contact, vehicle } = jsonData;
        

        const sqlUpdate = `
          UPDATE ParkingSpots
          SET availability = 1,
              name = ?,
              vehicleNumber = ?,
              contactNumber = ?
          WHERE spotID = (
              SELECT spotID
              FROM (
                  SELECT spotID
                  FROM ParkingSpots
                  WHERE availability = 0 AND areaID = ? -- Change this to the chosen areaID
                  ORDER BY spotID ASC
                  LIMIT 1
              ) AS subquery
          )`;

        connection.query(sqlUpdate, [name, vehicle, contact, areaID], (err, updateResult) => {
          if (err) {
            console.error('Error updating data:', err);
            res.writeHead(500);
            res.end('Error updating data');
          } else {
            console.log('Data updated successfully');

            const sqlSelect = `
              SELECT *
              FROM ParkingSpots where
              areaID = ?
              ORDER BY spotID ASC`;

              connection.query(sqlSelect, [areaID], (err, selectResult) => {
                if (err) {
                  console.error('Error querying data:', err);
                  res.writeHead(500);
                  res.end('Error querying data');
                } else {
                  const queriedParkingSpots = selectResult;
              
                  // Send the queriedParkingSpots to the client as JSON
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(queriedParkingSpots));
                }
              });
          }
        });
      } catch (err) {
        console.error('Error parsing JSON:', err);
        res.writeHead(400);
        res.end('Invalid JSON data');
      }
    });
  }
  else if (req.url === '/save-geojson') {
    // Handle /save-geojson endpoint
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const geojsonData = JSON.parse(data);
        console.log('Received GeoJSON data:', geojsonData);
    
        const polygonCoordinates = geojsonData.polygonCoordinates; // Extract the polygon coordinates
    
        // Print the coordinates to the console
        console.log('Polygon Coordinates:', polygonCoordinates);
    
        // Here, you can process or store the received GeoJSON data as needed.
        // For example, you could save it to a file, a database, or perform other actions.
    
        // Respond with a success message
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('GeoJSON data received and processed successfully');
      } catch (err) {
        console.error('Error parsing GeoJSON:', err);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid GeoJSON data');
      }
    });
  }
  else {
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

const PORT = 5000;

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