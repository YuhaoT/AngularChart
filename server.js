const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Serve static files from the Angular app
app.use(express.static(__dirname + '/dist/angular-chart'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/angular-chart/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
