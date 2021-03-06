const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/user')
const { generateTokenUser, addCookieToResponse, checkPermission } = require('../utils')

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password')
  res.status(StatusCodes.OK).json({users, usersCount: users.length})
}

const getUser = async (req, res) => {
  const {id} = req.params
  checkPermission(id, req.user);
  const user = await User.findById(id).select('-password');
  if (!user)
    throw new NotFoundError(`This id: ${id}, has no user associated with it`)
  res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = (req, res) => {
  res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name) throw new BadRequestError("Please provide name and email")
  const user = await User.findOneAndUpdate({_id: req.user.userId}, {email, name}, { 
    new: true, runValidators: true
  }).select('-password')
  const tokenizedUser = generateTokenUser(user)
  addCookieToResponse({res, user: tokenizedUser});
  res.status(StatusCodes.OK).json({user})
}

const updateUserPassword = async (req, res) => {
  const {oldPassword, newPassword} = req.body
  if (!oldPassword || !newPassword)
    throw new BadRequestError("Please insert your old and new password")
  const user = await User.findOne({_id: req.user.userId});
  if (!(await user.compare(oldPassword)))
    throw new BadRequestError("Your old password does not match the correct password")
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({msg:"Updated successfully"})
}

module.exports = {
  getAllUsers,
  getUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}