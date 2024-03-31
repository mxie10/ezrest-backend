const asyncHandler = require("express-async-handler");
const Reservation =  require('../models/reservation');
const User = require('../models/user');

exports.getAllReservationsByUserID = asyncHandler(async (req, res) => {
  try{
    const userID = req.params.userID;
    console.log('userID:',userID);
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
