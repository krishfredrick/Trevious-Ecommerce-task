const productController = require('./productController');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const uploadImage = require('./uploadImage');
const deleteProduct = require('./deleteProduct')

module.exports = {
  ...productController,
  createProduct,
  updateProduct,
  uploadImage,
  deleteProduct
}