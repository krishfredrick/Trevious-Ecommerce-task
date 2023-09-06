const express = require('express');
const router = express.Router();
const {authenticateUser:auth} = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

router
  .route('/')
  .post(auth, createReview)
  .get(getAllReviews)

router
  .route('/:id')
  .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview)

module.exports = router;