const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint
app.post('/echo', (req, res) => {
  // Send back whatever was received in the request body
  res.json(req.body);
});

// Simple GET endpoint for testing
app.get('/', (req, res) => {
  res.send('Hello! Send a POST request to /echo to see it echoed back.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});