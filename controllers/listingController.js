const asyncHandler = require("express-async-handler");
const Listing =  require("../models/listing");

exports.getAllListings = asyncHandler(async (req, res) => {
  try{
    const listings = await Listing.find().exec();
    res.status(200).json({ success: true, data: listings });
  }catch(error){
    console.log(error);
  }
});

exports.postListings = asyncHandler(async (req,res) => {
  try{
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json({ success: true, data: savedListing });
  }catch(error){
    console.log(error);
  }
});

exports.getListingById = asyncHandler(async (req, res) => {
  try{
    const listingID = req.params.listingID;
    const listing = await Listing.findOne({_id: listingID})
    res.status(200).json({ success: true, data: listing });
  }catch(error){
    console.log(error);
  }
});

