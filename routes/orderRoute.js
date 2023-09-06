const express = require('express');
const router = express.Router();
const {authorizePermission: adminAcess} = require('../middleware/authentication');


const  {
  getAllOrderHistory,
  getSingleOrderHistory,
  getCurrentUserOrders,
  updateOrder,
  createOrder 
} = require('../controllers/orderController');

router
  .route('/')
  .post(createOrder)
  .get(adminAcess('admin'),getAllOrderHistory);

router.route('/showMyOrders').get(getCurrentUserOrders);

router
  .route('/:id')
  .get(getSingleOrderHistory)
  .patch(updateOrder);

module.exports = router;