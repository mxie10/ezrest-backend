const mongoose = require('mongoose');

// Listing Schema
const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    landlordID:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    landlordName:{
        firstName:{
            type: String,
            required: false,
        },
        lastName:{
            type: String,
            required: false,
        }
    },
    type: {
        type: String,
        required: true,
    },
    basicInformation: {
        livingroom: {
            type: Number,
            required: false,
        },
        kitchen: {
            type: Number,
            required: false,
        },
        bathroom: {
            type: Number,
            required: false,
        },
        bedroom: {
            type: Number,
            required: false,
        },
        guests: {
            type: Number,
            required: false,
        },
    },
    features: {
        type: [String],
        required: false,
    },
    amenities: {
        type: [String],
        required: false,
    },
    safety: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    cleaning: {
        type: String,
        required: false,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    propertyImg: {
        type: [String],
        required: false,
    },
    address: {
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: true,
        },
        postal: {
            type: String,
            required: false,
        },
        instruction: {
            type: String,
            required: false,
        },
    },
    coordinate:{
        longtitude:{
            type: String,
            required: false,
        },
        latitude:{
            type: String,
            required: false,
        }
    },
    weekdayPrice: {
        type: Number,
        required: false,
    },
    weekendPrice: {
        type: Number,
        required: false,
    },
    availableDate: {
        type: Date,
        required: true,
    },
    propertyLicense: {
        type: String,
        required: false,
    },
    confirmationCode: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Listing', ListingSchema);
