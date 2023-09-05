const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookCopyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Identifier of the borrowed book copy
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

module.exports = BorrowedBook;
