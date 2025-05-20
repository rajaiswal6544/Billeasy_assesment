const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/books', authMiddleware, bookController.addBook);
router.get('/books', bookController.getBooks);
// router.get('/books/:id', bookController.getBookById);
router.get('/search', bookController.searchBooks);

module.exports = router;
