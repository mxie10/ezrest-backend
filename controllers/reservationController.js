const asyncHandler = require("express-async-handler");
const Reservation =  require('../models/reservation');

// exports.getAllReservations = asyncHandler(async (req, res) => {
//   const listings = await Reservation.find().exec();
//   // console.log("listings:", listings);
//   res.status(200).json({ success: true, data: listings });
// });

exports.postReservation = asyncHandler(async (req,res) => {
  const newReservation = new Reservation(req.body);
  const savedReservation = await newReservation.save();
  res.status(201).json({ success: true, data: savedReservation });
});
