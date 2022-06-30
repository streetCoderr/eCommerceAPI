const {
  getAllUsers,
  getUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/users_controller")

const express = require('express')
const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/dashboard').get(showCurrentUser)
router.route('/updateuser').patch(updateUser)
router.route('/updateuserpassword').patch(updateUserPassword)
router.route('/:id').get(getUser)

module.exports = router