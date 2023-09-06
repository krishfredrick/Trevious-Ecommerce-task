const User = require('../../models/user.model');
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {createUserToken, attachCookies, checkPermission} = require('../../utils')


const getAllUser = async (req, res)=>{
  // console.log("on getAllUser:",{...req.user});
  const users = await User.find({role: 'user'}).select('-password');
  res.status(StatusCodes.OK).json({users});
  
}

const getSingleUser = async(req, res)=>{
  const id = req.params.id;
  const user = await User.findOne({_id: id}).select('-password');;
  if(!user){
    throw new CustomError.NOT_FOUND_ERROR(`No user on id : ${req.params.id}`);
  }
  checkPermission(req.user, user._id);
  res.status(StatusCodes.OK).json({user});
};

const showCurrentUser = async(req, res)=>{
  // res.send("Show current User");
  res.status(StatusCodes.OK).json({user: req.user});
};




module.exports={
  getAllUser,
  getSingleUser,
  showCurrentUser,
}