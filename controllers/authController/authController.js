const User = require('../../models/user.model');
const {StatusCodes} = require('http-status-codes');
const customError = require('../../errors');
const { attachCookies} = require('../../utils/index')


const register = async(req, res)=>{
  const {email} = req.body;
  const emailIsExists = await User.findOne({email});
  if(emailIsExists){
    throw new customError.BAD_REQUEST('email already exist try another email');
  }
  //  First registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin': 'user';
  const user = await User.create({...req.body, role});
  const userToken = {
    name: user.name,
    userId: user._id,
    email: user.email
  }
  attachCookies({res: res, user: userToken})
  res.status(StatusCodes.CREATED).json({user: userToken});
}

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
  const userToken = {
    name: user.name,
    userId: user._id,
    email: user.email
  }
  attachCookies({res: res, user: userToken})
  res.status(StatusCodes.CREATED).json({user: userToken});
}
const logout = async(req, res)=>{
  res.cookie('token','logout', {
    httpOnly:true,
    expires: new Date(Date.now()+5 * 1000),
  });
  res.status(StatusCodes.OK).json({msg: " log out successful"});
};

module.exports = {
  register,
  login,
  logout,
}