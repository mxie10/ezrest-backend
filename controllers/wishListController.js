const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const Listing = require('../models/listing');
const WishList = require('../models/wishList');

exports.getWishList = asyncHandler(async (req, res) => {

    try {
        const userID = req.params.userID;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const wishlist = await WishList.find({ userID: userID });
        const listingIDs = wishlist.map(item => item.listingID);
        const listings = await Listing.find({ _id: { $in: listingIDs } });

        res.status(200).json({ success: true, data: listings });
    } catch (error) {
        console.log(error);
    }
});

exports.postWishList = asyncHandler(async (req, res) => {
    try {
        const newWishList = new WishList(req.body);
        const savedWishList = await newWishList.save();
        res.status(201).json({ success: true, data: savedWishList });
    } catch (error) {
        console.log(error);
    }
});

exports.deleteWishList = asyncHandler(async (req, res) => {
    try {
        const listingID = req.params.listingID;
        const wishList = await WishList.findOne({listingID: listingID})

        if (!wishList) {
            return res.status(404).json({ success: false, message: 'Wish list not found' });
        }

        await wishList.deleteOne();
        res.status(200).json({ success: true, message: 'Wish list deleted successfully' });   
    } catch (error) {
        console.log(error);
    }
});