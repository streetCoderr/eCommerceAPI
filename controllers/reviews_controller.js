const Review = require("../models/review")
const Product = require("../models/product")
const { BadRequestError, NotFoundError} = require("../errors")
const { StatusCodes } = require("http-status-codes")

const getAllReviews = (req, res) => {
  
}

const createReview = async (req, res) => {
  if(!req.body.product)
    throw new BadRequestError("please provide product");

  const productExists = await Product.findOne({_id: req.body.product})
  if (!productExists)
    throw new NotFoundError(`There is no product with id: ${req.body.product}`);

  const alreadyReviewed = await Review.findOne({
    product: req.body.product, user: req.user.userId
  })

  if (alreadyReviewed) 
    throw new BadRequestError("You have already reviewed this product");
  req.body.user = req.user.userId

  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({review})
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