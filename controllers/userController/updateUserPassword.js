const User = require('../../models/user.model');
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {createUserToken, attachCookies, checkPermission} = require('../../utils')


const updateUserPassword = async(req, res)=>{
  const {oldPassword, newPassword} = req.body;
  if(!oldPassword || !newPassword){
    throw new CustomError.BAD_REQUEST('Please provide both values');
  }
  const user = await User.findOne({_id: req.user.userId});
  const isMatch = await user.comparePassword(oldPassword);
  // console.log(isMatch)
  if(!isMatch){
    throw new CustomError.UNAUTHENTICATED('your password was mismatch try again');
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({msg: "success Password changed"});
  // res.send('updateUserPassword');
}

module.exports = updateUserPassword;