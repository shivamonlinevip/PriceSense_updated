const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// parse JSON
app.use(express.json());

// API route
app.use('/api/price', require('./routes/price'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
