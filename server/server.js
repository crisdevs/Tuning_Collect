const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const tuningRoutes = require('../routes/tuningRoutes.js');
//Accesses port in env file
const port = process.env.PORT;
const connectDB = require('../config/database.js');

connectDB();


const app = express();
// parses JSON from incoming request
app.use(express.json());

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/tunings', tuningRoutes);

app.listen(port, () => {
    console.log(`Tuner app listening on port ${port}`)
  })