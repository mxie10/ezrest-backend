const express = require('express');
const app = express();
const listingRoutes = require('./routes/listing');
const reservationRoutes = require('./routes/reservation');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/listing', listingRoutes);
app.use('/user', userRoutes);
// app.use('/reservation',reservationRoutes);

module.exports = app;
  