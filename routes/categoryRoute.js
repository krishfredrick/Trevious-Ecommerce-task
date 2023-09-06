const express = require('express');
const router = express.Router();

const { populateCategory, getAllCategory, createCatgory} = require('../controllers/categoryController');
const {authorizePermission: adminAcess, authenticateUser} = require('../middleware/authentication');

router
  .route('/danger/onlyForOneuse')
  .get(populateCategory);

router
  .route('/')
  .get(getAllCategory)
  .post(authenticateUser, adminAcess('admin','owner'), createCatgory);
module.exports = router