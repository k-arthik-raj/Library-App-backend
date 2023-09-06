const BorrowedBook = require('../models/borrowedBookModel');
const Book = require('../models/bookModel');

const borrowedBookController = {
  getAllBorrowedBooks: async (req, res) => {
    try {
      const borrowedBooks = await BorrowedBook.find();
      res.json(borrowedBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving borrowed books', error: error.message });
    }
  },

  borrowBook: async (req, res) => {
    try {
      const { userId, bookCopyId } = req.body;

      // Check if the book copy exists and is available
      const book = await Book.findOne({ 'copies._id': bookCopyId, 'copies.status': 'available' });

      if (!book) {
        return res.status(404).json({ message: 'No available copies of the book' });
      }

      // Mark the specific copy as 'borrowed'
      const copy = book.copies.find((copy) => copy._id.equals(bookCopyId));
      copy.status = 'borrowed';

      // Create a record of the borrowed book
      await BorrowedBook.create({ userId, bookCopyId });

      // Save the updated book document
      await book.save();

      res.json({ message: 'Book borrowed successfully', bookCopyId });
    } catch (error) {
      res.status(500).json({ message: 'Error borrowing book', error: error.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const { userId, bookCopyId } = req.body;

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
      const borrowedCopy = book.copies.find((copy) => copy._id.equals(bookCopyId));
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

  // ... other borrowed book-related controller methods

};

module.exports = borrowedBookController;
