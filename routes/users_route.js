const {
  getAllUsers,
  getUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/users_controller")
const {authorizer} = require('../middlewares')
const express = require('express')
const router = express.Router()

router.route('/').get(authorizer('admin'), getAllUsers)
router.route('/dashboard').get(showCurrentUser)
router.route('/updateuser').patch(updateUser)
router.route('/updateuserpassword').patch(updateUserPassword)
router.route('/:id').get(getUser)

module.exports = router