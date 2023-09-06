const User = require('../../models/user.model');
const {StatusCodes} = require('http-status-codes');
const customError = require('../../errors');
const { attachCookies, createUserToken} = require('../../utils/');


const login = async(req, res)=>{
  const {email, password} = req.body;
  // console.log(email, password);
  if(!email || !password){
    throw new customError.BAD_REQUEST('Please Provide correct email and password');
  }
  const user = await User.findOne({email});
  if(!user){
    throw new customError.UNAUTHENTICATED('Invalid Credentials No user found');
  }

  const isPassword = await user.comparePassword(password);
  // console.log(isPassword);
  if(!isPassword){
    throw new customError.UNAUTHENTICATED('Invalid Credentials Wrong Password');
  }
  const userToken = createUserToken(user);
  /**
   * userToken look a like
  `*  {
      name: user.name,
      userId: user._id,
      role: user.role
    }
   */

  attachCookies({res: res, user: userToken})
  res.status(StatusCodes.CREATED).json({user: userToken});
}
module.exports = login;