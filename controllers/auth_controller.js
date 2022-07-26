const User = require("../models/user");
const Token = require("../models/token");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const {
  generateTokenUser,
  addCookieToResponse,
  sendVerificationMail,
} = require("../utils");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw new BadRequestError("This email has been taken already");
  }
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  const verificationToken = crypto.randomBytes(50).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  // temporary origin
  const origin = "http://localhost:3000";
  sendVerificationMail({
    name: user.name,
    verificationToken,
    email: user.email,
    origin,
  });
  // const tokenizedUser = generateTokenUser(user);
  // addCookieToResponse({res, user: tokenizedUser})
  res
    .status(StatusCodes.CREATED)
    .json({
      msg: "Your account was created successfully. Check your email to verify your account",
    });
};

const verifyEmail = async (req, res) => {
  const { token, email } = req.query;
  if (!token || !email)
    throw new BadRequestError("Provide verification token and email");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Verification failed");
  if (user.verificationToken !== token)
    throw new UnauthenticatedError("Verification failed");
  user.verificationToken = "";
  user.isVerified = true;
  user.verificationDate = new Date();
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Verification successful!" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user)
    throw new UnauthenticatedError(
      "Authentication failed. Invalid credentials."
    );
  if (!(await user.compare(password)))
    throw new UnauthenticatedError(
      "Authentication failed. Invalid credentials."
    );
  if (!user.isVerified)
    throw new UnauthenticatedError("Please verify your mail.");

  const tokenizedUser = generateTokenUser(user);
  let refreshToken;
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    if (!existingToken.isValid)
      throw new UnauthenticatedError("Invalid credentials.");
    refreshToken = existingToken.refreshToken;
    addCookieToResponse({ res, user: tokenizedUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenizedUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  await Token.create({ refreshToken, user: user._id, isValid: true });
  addCookieToResponse({ res, user: tokenizedUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenizedUser });
};

const logout = async (req, res) => {
  res.cookie('accessToken', "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
  res.cookie('refreshToken', "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
  res.status(StatusCodes.OK).send("successful logged out");
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
