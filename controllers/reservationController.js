const asyncHandler = require("express-async-handler");
const Reservation =  require('../models/reservation');
const User = require('../models/user');

exports.getReservationsByUserID = asyncHandler(async (req, res) => {
  try{
    const userID = req.params.userID;
    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    const reservations = await Reservation.find({ userID: userID });
    res.status(200).json({ success: true, data: reservations });
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

exports.getReservationsByListingID = asyncHandler(async (req, res) => {
  try{
    const reservations = await Reservation.find({ listingID: req.params.listingID });
    res.status(200).json({ success: true, data: reservations });
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

exports.postReservation = asyncHandler(async (req,res) => {
  try{
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json({ success: true, data: savedReservation });
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

exports.deleteReservation = asyncHandler(async (req, res) => {
  try{
    const reservationID = req.params.reservationID;
    console.log('reservationID:',reservationID);
    const reservation = await Reservation.findById(reservationID);
    if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' })
    }
    await reservation.remove();
    res.status(200).json({ success: true });
  }catch(error){
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
