const Book = require('../models/bookModel');
const BorrowedBook = require('../models/borrowedBookModel');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
  },

  getBookById: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
  },

  createBook: async (req, res) => {
    try {
      const { name, genre, author, publisher, image, copies } = req.body;

      // Create a new book
      const book = await Book.create({
        name,
        genre,
        author,
        publisher,
        image,
        copies,
      });

      res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
      res.status(500).json({ message: 'Error creating book', error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const bookId = req.params.id;

      // Find the book by ID
      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Delete the book
      await book.remove();

      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
  },

  borrowBook: async (req, res) => {
    try {
      const { userId } = req.body;
      const bookId = req.params.id;

      // Find an available copy of the book
      const book = await Book.findOne({ _id: bookId, 'copies.status': 'available' });

      if (!book) {
        return res.status(404).json({ message: 'No available copies of the book' });
      }

      // Mark the copy as 'borrowed'
      const borrowedCopy = book.copies.find((copy) => copy.status === 'available');
      borrowedCopy.status = 'borrowed';

      // Create a record of the borrowed book
      await BorrowedBook.create({ userId, bookCopyId: borrowedCopy._id });

      // Save the updated book document
      await book.save();

      res.json({ message: 'Book borrowed successfully', bookCopyId: borrowedCopy._id });
    } catch (error) {
      res.status(500).json({ message: 'Error borrowing book', error: error.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const userId = req.body.userId;
      const bookCopyId = req.params.copyId;

      // Find the borrowed book record
      const borrowedBook = await BorrowedBook.findOne({ userId, bookCopyId });

      if (!borrowedBook) {
        return res.status(404).json({ message: 'Borrowed book record not found' });
      }

      // Find the book copy associated with the borrowed book record
      const book = await Book.findOne({ 'copies._id': bookCopyId });

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Mark the copy as 'available'
      const borrowedCopy = book.copies.find((copy) => copy._id.toString() === bookCopyId);
      borrowedCopy.status = 'available';

      // Remove the borrowed book record
      await borrowedBook.remove();

      // Save the updated book document
      await book.save();

      res.json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error returning book', error: error.message });
    }
  },
  // ... other book-related controller methods
};

module.exports = bookController;
