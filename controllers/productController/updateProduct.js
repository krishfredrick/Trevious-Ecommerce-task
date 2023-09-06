const Product = require('../../models/product.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const path = require('path');

const updateProduct = async(req, res)=>{
  // res.send('update product');
  const {id: productId} = req.params;
  const product = await Product.findOneAndUpdate({_id: productId}, req.body, {new: true, runValidators: true});
  if(!product){
    throw new CustomError.NOT_FOUND_ERROR('We are really sorry!!! we are out of Stock for update...');
  }
  res.status(StatusCodes.OK).json({product});
}

module.exports = updateProduct;