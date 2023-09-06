const Product = require('../../models/product.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const path = require('path');


const deleteProduct = async(req, res)=>{
  // res.send('delete product');
  const {id: productId} = req.params;
  const product = await Product.findOne({_id: productId});
  if(!product){
    throw new CustomError.NOT_FOUND_ERROR('There is no product to delete');
  }

  await product.remove();
  res.status(StatusCodes.OK).json({
    message: 'Successfully, Product Deleted!'
  })
  
}

module.exports = deleteProduct;