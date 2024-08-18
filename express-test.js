const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Array to store logs
let logs = [];

// Function to add log
function addLog(message) {
  const timestamp = new Date().toISOString();
  logs.push(`${timestamp}: ${message}`);
  console.log(`${timestamp}: ${message}`);
  if (logs.length > 100) logs.shift(); // Keep only last 100 logs
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to log all requests
app.use((req, res, next) => {
  addLog(`${req.method} request received at ${req.url}`);
  next();
});

// POST endpoint
app.post('/echo', (req, res) => {
  addLog(`Received POST data: ${JSON.stringify(req.body)}`);
  res.json(req.body);
});

// GET endpoint for the front-end
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Express Test Server</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #333; }
        #logs { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
        .log-entry { margin-bottom: 5px; }
      </style>
    </head>
    <body>
      <h1>Express Test Server</h1>
      <p>Send a POST request to /echo to see it echoed back.</p>
      <h2>Server Logs:</h2>
      <div id="logs">
        ${logs.map(log => `<div class="log-entry">${log}</div>`).join('')}
      </div>
      <script>
        setInterval(() => {
          fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              document.getElementById('logs').innerHTML = doc.getElementById('logs').innerHTML;
            });
        }, 5000); // Refresh every 5 seconds
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

// Start the server
app.listen(port, () => {
  addLog(`Server running on port ${port}`);
});
