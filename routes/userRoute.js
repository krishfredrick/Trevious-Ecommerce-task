const express = require('express');
const router = express.Router();
const {authorizePermission: adminAcess} = require('../middleware/authentication');

const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require('../controllers/userController');

router.route('/').get(adminAcess('admin', 'owner'),getAllUser);
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/:id').get(getSingleUser);

module.exports = router;
