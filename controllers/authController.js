const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken');

// @route POST /auth/register
// @desc Register user
// @access Public
exports.register = asyncHandler(async (req, res, next) => {

  console.log("Register user : Post-->")
  const { username, email, password, profile } = req.body;

  console.log('req.body:', req.body);

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400).json({message:''});
    throw new Error("A user with that email already exists");
  }

  const usernameExists = await User.findOne({ username });

  console.log('usernameExists:', usernameExists);

  if (usernameExists) {
    res.status(400).json({message:''});
    throw new Error("A user with that username already exists");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      profile,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.log('error is:', e);
  }
});

// @route POST /auth/login
// @desc login user
// @access Public
exports.login = asyncHandler(async (req, res) => {

  console.log("login user : Post")

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide username and password");
  }

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      user: user,
      token: generateToken(user._id),
    });
    console.log('user:',user);
  }
  else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});


// @route POST /auth/getUser
// @desc get user
// @access Private  

exports.getUser = asyncHandler(async (req, res) => {
  console.log("get user : Get")
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile
    });
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }
});