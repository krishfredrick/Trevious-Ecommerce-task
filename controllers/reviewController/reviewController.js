const Product = require('../../models/product.model');
const Review = require('../../models/review.model')
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {checkPermission} = require('../../utils');


const createReview = async(req, res)=>{
  const {product: productId} = req.body;
  const isValidProduct = await Product.findOne({_id:productId});
  if(!isValidProduct){
    throw new CustomError.NOT_FOUND_ERROR(`No product with id: ${productId}`)
  }
  const alreadySumbitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if(alreadySumbitted){
    throw new CustomError.BAD_REQUEST(
      'Already submitted review for this product'
    );
  }
  res.send('create review');
  req.body.user = req.user.userId
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({review});
}
const getSingleProductReviews = async(req, res)=>{
  const {id} = req.params;
  const reviews = await Review.find({ product: id});
  res.status(StatusCodes.OK).json({reviews,count: reviews.length});
}


//  ******* Get All Reviews  only Admin Access this route


const getAllReviews = async(req, res)=>{
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({reviews, count: reviews.length})
}


// **** get Single Review

const getSingleReview = async(req, res)=>{
  const {id} = req.params;
  const review = await Review.findOne({_id: id}).populate({
    path:'product',
    select: 'name company price',
  })
  if(!review){
    throw new CustomError.NOT_FOUND_ERROR(`No review with id ${id}`);
  }
  res.status(StatusCodes.OK).json({review});
}


// **** Update Review ****


const updateReview = async(req, res)=>{
  const {id} = req.params;
  const {rating, title, comment} = req.body;
  const review = await Review.findOne({_id: id});
  if(!review){
    throw new CustomError.NOT_FOUND_ERROR(`No review with id ${id}`);
  }
  checkPermission(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({review});
}

// ****** Delete Review *******

const deleteReview = async(req, res)=>{
  const {id} = req.params;
  const review = await Review.findOne({_id: id});
  if(!review){
    throw new CustomError.NOT_FOUND_ERROR(`No review with id ${id}`);
  }
  checkPermission(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({msg: 'Successfully! Removed'});
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews
}