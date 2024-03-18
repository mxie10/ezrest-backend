const mongoose= require('mongoose');
const bcrypt = require("bcryptjs");
//lol
const  UserLandlordSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createAt: {
    type: Date,
    required: true,
    unique: true,
    trim: true,
  },
  updateAt: {
    type: Date,
    required: true,
    unique: true,
    trim: true,
  },
  properties: {
    type: Array,
    required: true,
    unique: true,
    trim: true,
  },
}, {
  timestamps: true,
});

UserLandlordSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserLandlordSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
}

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('UserLandlord',UserLandlordSchema);