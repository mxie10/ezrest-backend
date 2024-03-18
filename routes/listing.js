const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/listingController');
const passport = require('passport');

// router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getListings);
router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getAllListings);
router.post('/', passport.authenticate("jwt", { session: false }), ListingController.postListings);
module.exports = router;