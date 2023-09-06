const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  author: { type: String, required: true },
  publisher: { type: String },
  image: { type: String },// Store base64 encoded image data
  copies: [
    {
      copyId: { type: String, default: () => uuidv4() }, // Default to a new UUID
      status: { type: Boolean, default: true }, // Default status to true
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
