const Review = require('../models/Review');
const Book = require('../models/Book');

// POST /books/:id/reviews – Submit review
exports.submitReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    const existing = await Review.findOne({ book: bookId, user: req.user.userId });
    if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = await Review.create({
      book: bookId,
      user: req.user.userId,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /reviews/:id – Update your own review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not your review' });

    const { rating, comment } = req.body;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /reviews/:id – Delete your own review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId)
      return res.status(403).json({ message: 'Not your review' });

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books/:id – Extend to show average rating and paginated reviews
exports.getBookWithReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments({ book: req.params.id });
    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    res.json({
      book,
      averageRating: avgRating[0]?.avg || 0,
      totalReviews,
      page,
      limit,
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
