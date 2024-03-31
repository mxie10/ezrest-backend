const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const passport = require('passport');

router.get('/:userID', ReservationController.getAllReservationsByUserID);
router.post('/',  ReservationController.postReservation);
module.exports = router;