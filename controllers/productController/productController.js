const Product = require('../../models/product.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const path = require('path');

const getAllProducts = async(req, res)=>{
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({products, count:products.length})
}

const getSingleProduct = async(req, res)=>{
  const {id: productId} = req.params;
  const product = await Product.findOne({_id: productId}).populate('review');
  if(!product){
    throw new CustomError.NOT_FOUND_ERROR('We are really sorry!!! we are out of Stock...');
  }
  res.status(StatusCodes.OK).json({product});
}

module.exports = {
  getAllProducts,
  getSingleProduct,
}