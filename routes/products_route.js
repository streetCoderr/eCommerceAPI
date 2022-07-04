const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} = require("../controllers/products_controller");
const {authorizer} = require('../middlewares')


router.route('/').get(getAllProducts).post(authorizer('admin'), createProduct);
router.route('/uploadImage').post(authorizer('admin'), uploadImage)
router.route('/:id').get(getSingleProduct)
.patch(authorizer('admin'), updateProduct)
.delete(authorizer('admin'), deleteProduct)

module.exports = router