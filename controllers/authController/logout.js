const User = require('../../models/user.model');
const {StatusCodes} = require('http-status-codes');
const customError = require('../../errors');
const { attachCookies} = require('../../utils/index');

const logout = async(req, res)=>{
  res.cookie('token','logout', {
    httpOnly:true,
    expires: new Date(Date.now()+5 * 1000),
  });
  res.status(StatusCodes.OK).json({msg: " log out successful"});
};

module.exports = logout;