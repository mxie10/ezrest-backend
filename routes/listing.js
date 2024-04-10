const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/listingController');
const passport = require('passport');

// router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getListings);
router.get('/' ,ListingController.getAllListings);
router.post('/' , ListingController.postListings);
router.get('/:listingID',ListingController.getListingById);
router.put('/availableDate/:listingID',ListingController.updateAvailableDate);
module.exports = router;