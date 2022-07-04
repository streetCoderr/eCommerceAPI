
const getAllProducts = (req, res) => {
  res.send("get all products");
}

const createProduct = (req, res) => {
  res.send("create product");
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