const express = require('express');
const router = express.Router();
const WishListsController = require('../controllers/wishListController');
const passport = require('passport');

// router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getListings);
router.get('/:userID' , WishListsController.getWishList);
router.post('/' , WishListsController.postWishList);
router.delete('/:listingID',WishListsController.deleteWishList);

module.exports = router;