const Review = require("../models/review")
const Product = require("../models/product")
const { BadRequestError, NotFoundError} = require("../errors")
const { StatusCodes } = require("http-status-codes")

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name brand price'})
  res.status(StatusCodes.OK).json({reviews, reviewsLength: reviews.length})
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

const getSingleReview = async (req, res) => {
  const {id: reviewId} = req.params
  const review = await Review.findOne({_id: reviewId}).populate({
    path:'product',
    select:'brand name price'
  }).populate({
    path: 'user',
    select: 'name email'
  })
  if (!review)
    throw new NotFoundError(`There is no review matching the id: ${reviewId}`)
  res.status(StatusCodes.OK).json({review})
}

const updateReview = (req, res) => {
  res.send("update review")
}

const deleteReview = (req, res) => {
  res.send("delete review")
}

module.exports = {createReview, getAllReviews, getSingleReview, updateReview, deleteReview}