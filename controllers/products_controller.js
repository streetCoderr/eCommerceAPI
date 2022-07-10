const Product = require("../models/product");
const {StatusCodes} = require("http-status-codes")
const {NotFoundError, BadRequestError} = require("../errors");
const path = require("path")

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

const deleteProduct = async (req, res) => {
  const {id} = req.params
  const product = await Product.findById(id);
  if (!product)
    throw new NotFoundError(`This id: ${id}, has no product associated with it`)
  await product.remove()
  res.status(StatusCodes.OK).json({msg: "deleted successfully"})
}

const uploadImage = async (req, res) => {
  if (!req.files)
    throw new BadRequestError("No file uploaded");
  console.log(req.files)
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith("image"))
    throw new BadRequestError("Please upload an image")
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize)
    throw new BadRequestError("Your image size should be less than 1MB")
  const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`)
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`});
}

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
}