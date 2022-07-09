

const getAllReviews = (req, res) => {
  res.send("get all reviews")
}

const createReview = (req, res) => {
  res.send("create review")
}

const getSingleReview = (req, res) => {
  res.send("get single review")
}

const updateReview = (req, res) => {
  res.send("update review")
}

const deleteReview = (req, res) => {
  res.send("delete review")
}

module.exports = {createReview, getAllReviews, getSingleReview, updateReview, deleteReview}