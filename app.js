const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
dotenv.config();
connectDB();

const app = express();

app.use(express.json());


app.use('/', authRoutes);

app.use('/', bookRoutes);
app.use('/', reviewRoutes);



module.exports = app;
