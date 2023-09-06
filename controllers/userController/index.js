const userController = require('./userController');
const updateUser = require('./updateUser');
const updateUserPassword = require('./updateUserPassword');



module.exports={
  ...userController,
  updateUser,
  updateUserPassword,
}