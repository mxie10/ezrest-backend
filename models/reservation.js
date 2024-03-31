const mongoose= require('mongoose');

//Assets Schema
const ReservationSchema = new mongoose.Schema({
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
  listingImageSrc: {
    type: String,
    required:false
  },
  listingAddress: {
    type: String,
    required:false
  },
  checkinDate: {
    type: Date,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
  guests:{
    adults:{
      type: Number,
      required:false
    },
    children:{
      type: Number,
      required:false
    },
    infants:{
      type: Number,
      required:false
    },
    pets:{
      type: Number,
      required:false
    }
  },
  confirmationCode:{
    type: String,
    required:false
  },
  payment:{
    method:{
      type: String,
      required:true
    },
    cardNumber:{
      type: String,
      required:true
    },
    name:{
      type: String,
      required:true
    },
    cvv:{
      type: String,
      required:true
    },
    expirayDate:{
      type: String,
      required:true
    }
  },
  totalPrice: {
    type: Number,
  },
},{timestamps: true});

module.exports = mongoose.model('Reservation',ReservationSchema);