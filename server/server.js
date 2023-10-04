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
// app.use('/static', express.static(path.join(__dirname, 'public')));S
// app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', (req, res) =>{
//   res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
// });
app.use('/api/tunings', tuningRoutes);
// app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Tuner app listening on port ${port}`)
  })