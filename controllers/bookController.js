const Book = require('../models/Book');

// POST /books – Add a new book (auth required)
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const book = await Book.create({ title, author, genre, publishedYear });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books – Get all books with pagination and filters
exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i'); // case-insensitive
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books/:id – Get single book with future review logic
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book); // we'll extend this with reviews in Step 3
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    // Use regex for partial + case-insensitive search
    const regex = new RegExp(query, 'i');
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }]
    });

    res.json({ total: books.length, books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};