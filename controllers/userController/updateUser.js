const User = require('../../models/user.model');
const { StatusCodes}  = require('http-status-codes');
const CustomError = require('../../errors');
const {createUserToken, attachCookies, checkPermission} = require('../../utils')


const updateUser = async(req, res)=>{
  const {email, name} = req.body;
  if(!email || !name){
    throw new CustomError.BAD_REQUEST('Please Provide all values');
  }
  const user = await User.findOneAndUpdate(
    { _id:req.user.userId},
    {email, name},
    {new: true, runValidators: true}
  );

  const userToken = createUserToken(user);
  attachCookies({res, user:userToken});
  res.status(StatusCodes.OK).json({user: userToken});
};


module.exports = updateUser