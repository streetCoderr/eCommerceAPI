const Product = require("../models/product");
const {StatusCodes} = require("http-status-codes")

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({products, productsCount: products.length})
}

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
}

const getSingleProduct = (req, res) => {
  res.send("get a product");
}

const updateProduct = (req, res) => {
  res.send("update product")
}

const deleteProduct = (req, res) => {
  res.send("delete product")
}

const uploadImage = (req, res) => {
  res.send("upload image");
}

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
}