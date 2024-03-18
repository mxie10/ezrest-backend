const asyncHandler = require("express-async-handler");
const Listing =  require("../models/listing");

exports.getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find().exec();
  // console.log("listings:", listings);
  res.status(200).json({ success: true, data: listings });
});

exports.postListings = asyncHandler(async (req,res) => {
  console.log('req.body:',req.body);
  const newListing = new Listing(req.body);
  const savedListing = await newListing.save();
  res.status(201).json({ success: true, data: savedListing });
});

