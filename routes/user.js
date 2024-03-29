const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');

router.put('/addFavorite/:userID', UserController.addFavorite);

module.exports = router;