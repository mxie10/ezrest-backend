const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
//lol
const wishList = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('wishList', wishList);