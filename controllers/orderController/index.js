const order = require('./orderController.js');
const createOrder = require('./createOrder.js');
const updateOrder = require('./updateOrder');


module.exports = {
  ...order,
  createOrder,
  updateOrder
}