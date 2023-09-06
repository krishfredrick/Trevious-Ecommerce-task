const Order = require('../../models/order.model');
const Product = require('../../models/product.model')
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {checkPermission} = require('../../utils');


const updateOrder = async(req, res)=>{
  const { id, status} = req.params;
  const order = await Order.findOne({_id: id});
  if(!order){
    throw new CustomError.BAD_REQUEST('No order items provided');
  };

  checkPermission(req.user, order.user);

  order.status = status;
  await order.save();

  res.status(StatusCodes.OK).json({order});
}

module.exports = updateOrder;