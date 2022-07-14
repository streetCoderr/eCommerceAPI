const User = require('../models/user');
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { generateTokenUser, addCookieToResponse, sendVerificationMail } = require('../utils')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const alreadyExists = await User.findOne({email})
  if (alreadyExists) {
    throw new BadRequestError("This email has been taken already")
  }
  const role =  (await User.countDocuments({}) === 0) ?
  'admin' : 'user';
  const verificationToken = crypto.randomBytes(50).toString('hex')
  const user = await User.create({name, email, password, role, verificationToken});
  // temporary origin
  const origin = "http://localhost:3000";
  sendVerificationMail({
    name: user.name,
    verificationToken,
    email: user.email,
    origin
  })
  // const tokenizedUser = generateTokenUser(user);
  // addCookieToResponse({res, user: tokenizedUser})
  res.status(StatusCodes.CREATED).json({msg: "Your account was created successfully. Check your email to verify your account"})
}

const verifyEmail = async (req, res) => {
  const {token, email} = req.query
  if (!token || !email)
    throw new BadRequestError("Provide verification token and email")
  const user = await User.findOne({email})
  if (!user)
    throw new UnauthenticatedError("Verification failed")
  if (user.verificationToken !== token)
    throw new UnauthenticatedError("Verification failed")
  user.verificationToken = '';
  user.isVerified = true;
  user.verificationDate = new Date();
  await user.save();
  res.status(StatusCodes.OK).json({msg: "Verification successful!"})
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }
  const user = await User.findOne({email})
  if (!user)
    throw new UnauthenticatedError("Authentication failed. Invalid credentials.")
  if (!(await user.compare(password)))
    throw new UnauthenticatedError("Authentication failed. Invalid credentials.")
  const tokenizedUser = generateTokenUser(user);
  addCookieToResponse({res, user: tokenizedUser})
  res.status(StatusCodes.OK).json({user: tokenizedUser})
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).send("successful logged out")
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
}