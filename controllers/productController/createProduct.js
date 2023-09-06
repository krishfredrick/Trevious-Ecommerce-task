const Product = require('../../models/product.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const path = require('path');

const createProduct = async(req, res)=>{
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.ACCEPTED).json({});
  // res.send('create product');
}

module.exports = createProduct;