const User = require('../../models/user.model');
const {StatusCodes} = require('http-status-codes');
const customError = require('../../errors');
const { attachCookies, createUserToken} = require('../../utils/index')


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
  const userToken = createUserToken(user);
  attachCookies({res: res, user: userToken})
  res.status(StatusCodes.CREATED).json({user: userToken});
};

module.exports = register;