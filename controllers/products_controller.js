const Product = require("../models/product");
const {StatusCodes} = require("http-status-codes")
const {NotFoundError} = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({products, productsCount: products.length})
}

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
}

const getSingleProduct = async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  if (!product)
    throw new NotFoundError(`This id: ${id}, has no product associated with it`)
  res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req, res) => {
  const {id} = req.params;
  if (req.body.shippingFee) {
    req.body.freeDelivery = req.body.shippingFee === 0
  }
  const product = await Product.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true});
  if (!product)
    throw new NotFoundError(`This id: ${id}, has no product associated with it`)
  res.status(StatusCodes.OK).json({product})
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