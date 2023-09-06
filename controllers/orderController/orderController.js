const Order = require('../../models/order.model');
const Product = require('../../models/product.model')
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {checkPermission} = require('../../utils');


const getAllOrderHistory = async(req, res)=>{
  const order = await Order.find({});
  res.status(StatusCodes.OK).json({ order, count: order.length});
}

const getSingleOrderHistory = async(req, res)=>{
  const {id} = req.params;
  const order = await Order.findOne({_id: id});
  if(!order){
    throw new CustomError.BAD_REQUEST('No order items provided');
  };

  checkPermission(req.user, order.user);
  res.status(StatusCodes.OK).json({ order});
}

const getCurrentUserOrders = async(req, res)=>{
  const orders =await Order.find({user: req.user.userId});
  res.status(StatusCodes.OK).json({orders, count: orders.length});
}

module.exports = {
  getAllOrderHistory,
  getSingleOrderHistory,
  getCurrentUserOrders,
  // creatOrder,
  // updateOrder
}