const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const passport = require('passport');

// router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getListings);
// router.get('/', ReservationController);
router.post('/', passport.authenticate("jwt", { session: false }), ReservationController.postReservation);
module.exports = router;