const express = require('express');
const app = express();
const listingRoutes = require('./routes/listing');
const reservationRoutes = require('./routes/reservation');
const authRoutes = require('./routes/auth');
const wishListRoutes = require('./routes/wishList');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/listing', listingRoutes);
app.use('/wishList',wishListRoutes);
app.use('/reservation',reservationRoutes);
app.use('/user',userRoutes);


module.exports = app;
  