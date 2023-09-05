const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  author: { type: String, required: true },
  publisher: { type: String },
  image: { type: String },// Store base64 encoded image data
  copies: [
    {
      copyId: { type: String, required: true }, // Unique identifier for each copy
      status: { type: Boolean, default: true },
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
