const Product = require('../../models/product.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const path = require('path');

const uploadImage = async(req, res)=>{
  if(!req.file){
    throw new CustomError.BAD_REQUEST('No File Uploaded');
  }

  const productImage = req.file.image;
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BAD_REQUEST('Please upload Images');
  }

  const maxSize = 1024 * 1024;
  if(productImage.size> maxSize){
    throw new CustomError.BAD_REQUEST(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname, '../public/uploads/'+`${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({image: `/upload/${productImage.name}`})
  // res.send('upload image');
}

module.exports = uploadImage;