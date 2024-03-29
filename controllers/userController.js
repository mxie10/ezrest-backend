const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const WishListing = require('../models/wishList');

exports.addFavorite = asyncHandler(async (req, res) => {
    const userID = req.params.userID;
    const listingID = req.body.listingID

    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    const index = user.favoriteItems.indexOf(listingID);

    try {
        if (index === -1) {
            await User.findByIdAndUpdate(
                userID,
                { $addToSet: { favoriteItems: listingID } }
            );
            res.status.json({ message: 'success!' })
        } else {
            await User.findByIdAndUpdate(
                userID,
                { $pull: { favoriteItems: listingID } }
            );
            res.status(200).json({ message: 'Listing remove' })
        }
    } catch (err) {
        console.log(err);
    }
});
