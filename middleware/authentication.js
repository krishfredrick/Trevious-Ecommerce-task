const CustomError = require('../errors');
// const {StatusCode} = require('http-status-codes')
const { isTokenValid } = require('../utils');

const authenticateUser = async(req, res, next)=>{
  const token = req.signedCookies.token;
  if(!token){
    // console.log('error, no token present');
    throw new CustomError.UNAUTHENTICATED('Authentication Invalid');
  }
  try {
    const payload = isTokenValid({token});
    req.user = {...payload}
    console.log('Payload:',{...payload} );
    next();
  } catch (error) {
    throw new CustomError.UNAUTHENTICATED('Authentication Invalid');
  }
};
const authorizePermission = (...roles)=>{
  // console.log('admin route');
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      throw new CustomError.UNAUTHORIZED('Access Restricted.!!! previlage provided to Admin or Owner');
    }
    next();
  }
}


module.exports = {
  authenticateUser,
  authorizePermission
}