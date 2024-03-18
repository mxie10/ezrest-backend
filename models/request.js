const mongoose= require('mongoose');

//Assets Schema
const RequestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
  userType: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updateAt: {
    type: Date,
    required: true,
  },
  requestCompany: {
    type: String,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Request',RequestSchema);