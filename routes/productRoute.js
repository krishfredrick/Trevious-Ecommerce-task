const express = require('express');
const router = express.Router();
const {authorizePermission: adminAcess, authenticateUser} = require('../middleware/authentication');

const  {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} = require('../controllers/productController');

const {getSingleProductReviews} = require('../controllers/reviewController');

router
  .route('/')
  .post([authenticateUser,adminAcess('admin')],createProduct)
  .get(getAllProducts);

router
  .route('/uploadImage')
  .post([authenticateUser,adminAcess('admin')],uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser,adminAcess('admin')],updateProduct)
  .delete([authenticateUser,adminAcess('admin')],deleteProduct);
  
router.get('/:id/review', getSingleProductReviews);
module.exports = router;