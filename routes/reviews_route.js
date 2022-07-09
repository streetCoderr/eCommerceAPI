const {
  createReview, 
  getAllReviews, 
  getSingleReview, 
  updateReview, 
  deleteReview
} = require("../controllers/reviews_controller")
const {authenticator} = require("../middlewares")

const express = require("express")
const router = express.Router()

router.route('/')
  .get(getAllReviews)
  .post(authenticator, createReview)
router.route('/:id')
  .get(getSingleReview)
  .patch(authenticator, updateReview)
  .delete(authenticator, deleteReview)

module.exports = router