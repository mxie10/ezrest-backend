const asyncHandler = require("express-async-handler");
const Listing = require("../models/listing");

exports.getAllListings = asyncHandler(async (req, res) => {
  try {
    const { pageNumber, filterOptions } = req.query;
    console.log('filterOptions:', filterOptions);

    const query = {};

    if (filterOptions.apply === 'false') {
      const listings = await Listing.find().limit(12).skip((pageNumber - 1) * 12) .exec();
      res.status(200).json({ success: true, data: listings });
    } else {
      //location filter option
      if (filterOptions.location.length) {
        query.$or = [
          { 'address.city': filterOptions.location },
          { 'address.postal': filterOptions.location },
        ];
      };
      //date filter option
      if (filterOptions.checkinDate.length) {
        query['availableDate'] = {
          $gte: filterOptions.checkinDate
        };
      };
      //province filter option
      if (filterOptions.province !== '') {
        query['address.state'] = filterOptions.province;
      }
      //price filter option
      if (filterOptions.price.max !== '0') {
        query['weekdayPrice'] = {
          $gte: parseInt(filterOptions.price.min),
          $lte: parseInt(filterOptions.price.max)
        };
      }
      //bedrooms filter option
      if (filterOptions.bedrooms !== '0') {
        query['basicInformation.bedroom'] = filterOptions.bedrooms;
      }
      //category filter option
      if (filterOptions.category.length !== 0) {
        query['type'] = filterOptions.category;
      }
      const listings = await Listing.find(query)
        .limit(12) 
        .skip((pageNumber - 1) * 12) 
        .exec();

      // console.log('listings:',listings);
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

exports.updateAvailableDate = asyncHandler(async (req, res) => {
  try {
    const listingID = req.params.listingID;
    const { availableDate } = req.body;

    console.log('listingID is:',listingID);
    console.log('availableDate is:',availableDate);

    const updatedListing = await Listing.findOneAndUpdate(
      { _id: listingID },
      { $set: { availableDate: availableDate } }, 
      { new: true } 
    );

    if (!updatedListing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    res.status(200).json({ success: true, data: updatedListing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


