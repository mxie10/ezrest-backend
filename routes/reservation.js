const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const passport = require('passport');

router.get('/:userID', ReservationController.getReservationsByUserID);
router.get('/listings/:listingID', ReservationController.getReservationsByListingID);
router.post('/',  ReservationController.postReservation);
router.delete('/:reservationID',ReservationController.deleteReservation);
module.exports = router;