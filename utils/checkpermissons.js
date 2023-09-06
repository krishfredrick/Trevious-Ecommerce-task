const CustomError = require('../errors');


const checkPermission = (reqUser, resourceUserId)=>{
  // console.log(reqUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if(reqUser.role === 'admin' || reqUser.role === 'owner') return;
  if(reqUser.userId === String(resourceUserId)) return;
  throw new CustomError.UNAUTHORIZED("NO Authorized ...!!!");
}

module.exports = checkPermission;