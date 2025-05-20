const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/books/:id/reviews', authMiddleware, reviewController.submitReview);
router.put('/reviews/:id', authMiddleware, reviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReview);

// Override GET /books/:id with extended controller
const bookController = require('../controllers/bookController');
router.get('/books/:id', reviewController.getBookWithReviews); // replace bookController.getBookById

module.exports = router;
