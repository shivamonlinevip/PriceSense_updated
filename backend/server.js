const express = require('express');
const bodyParser = require('body-parser');
const priceRoutes = require('./routes/price');
const app = express();
app.use(bodyParser.json());
app.use('/api', priceRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
