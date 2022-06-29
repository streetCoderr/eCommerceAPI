const User = require('../models/user');
const { BadRequestError } = require('../errors')
const { generateTokenUser, addCookieToResponse } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const alreadyExists = await User.findOne({email})
  if (alreadyExists) {
    throw new BadRequestError("This email has been taken already")
  }
  const role =  (await User.countDocuments({}) === 0) ?
  'admin' : 'user';
  const user = await User.create({name, email, password, role});
  const tokenizedUser = generateTokenUser(user);
  addCookieToResponse({res, user: tokenizedUser})
  res.status(200).json({user: tokenizedUser})
}

const login = async (req, res) => {
  res.send('login user')
}

const logout = async (req, res) => {
  res.send('logout user')
}

module.exports = {
  register,
  login,
  logout
}