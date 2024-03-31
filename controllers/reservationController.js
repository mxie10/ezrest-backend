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
    const userID = req.query.userID
    console.log('userID:',userID);
    const user = await User.findById(userID);
    if (!user) {
        console.log("in?????????????");
        return res.status(404).json({ message: 'User not found' })
    }
    console.log('getReservationsByListingID_userID:',userID);
    console.log('getReservationsByListingID_listingID:',req.params.listingID);
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
