const asyncHandler = require("express-async-handler");
const Listing = require("../models/listing");

exports.getAllListings = asyncHandler(async (req, res) => {
  try {
    const { pageNumber, filterOptions } = req.query;
    console.log('filterOptions:', filterOptions);

    const query = {};

    if (filterOptions.apply === 'false') {
      const listings = await Listing.find().limit(20).skip((pageNumber - 1) * 20) .exec();
      res.status(200).json({ success: true, data: listings });
    } else {
      // if (filterOptions.location !== '') {
      //   query.$or = [
      //     { 'address.city': filterOptions.location },
      //     { 'address.state': filterOptions.location },
      //     { 'address.addressLine1': filterOptions.location }
      //   ];
      // }
      // if (filterOptions.province) {
      //   query['address.state'] = filterOptions.province;
      // }
      if (filterOptions.price) {
        console.log('in price?', filterOptions.price);
        query['weekdayPrice'] = {
          $gte: parseInt(filterOptions.price.min),
          $lte: parseInt(filterOptions.price.max)
        };
      }
      if (filterOptions.bedrooms !== '0') {
        query['basicInformation.bedroom'] = parseInt(filterOptions.bedrooms);
      }
      if (filterOptions.category !== '') {
        query['type'] = filterOptions.category;
      }
      const listings = await Listing.find(query)
        .limit(20) 
        .skip((pageNumber - 1) * 20) 
        .exec();

      console.log('listings:',listings);
      res.status(200).json({ success: true, data: listings });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.postListings = asyncHandler(async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json({ success: true, data: savedListing });
  } catch (error) {
    console.log(error);
  }
});

exports.getListingById = asyncHandler(async (req, res) => {
  try {
    const listingID = req.params.listingID;
    const listing = await Listing.findOne({ _id: listingID })
    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    console.log(error);
  }
});

