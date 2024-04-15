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
            res.status(200).json({ message: 'success!' })
        }else {
          res.status(500).json({ message: 'Favorite items alreay exists' });
        }
    } catch (err) {
        console.log(err);
    }
});

exports.deleteFavorite = asyncHandler(async (req, res) => {
  const userID = req.params.userID;
  const listingID = req.body.listingID;

  console.log('userID:',userID);
  console.log('listingID:',listingID);
  // console.log('in deleteFavorite?');

  const user = await User.findById(userID);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  const index = user.favoriteItems.indexOf(listingID);

  try {
      if (index !== -1) {
          await User.findByIdAndUpdate(
              userID,
              { $pull: { favoriteItems: listingID } }
          );
          res.status(200).json({ message: 'Favorite deleted successfully' });
      } else {
          res.status(404).json({ message: 'Favorite not found' });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

