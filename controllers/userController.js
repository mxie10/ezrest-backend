const asyncHandler = require("express-async-handler");
const User =  require('../models/user');

exports.addFavorite = asyncHandler(async (req,res) => {
    const userID = req.user._id;
    const listingID = req.listingID;

    const user = await User.findByIdAndUpdate(
        userID,
        { $addToSet: { favoriteItems: listingID } },
        { new: true }
    );

    res.json(user);
});