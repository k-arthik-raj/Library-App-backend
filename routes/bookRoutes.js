const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Test route
router.get('/', (req,res) => {
    res.send("Welcome to the library")
});

// Get all books route
router.get('/list', bookController.getAllBooks);

// Get a book by ID route
router.get('/:id', bookController.getBookById);

// Create a book
router.post('/add', bookController.createBook);

// Borrow a book route
router.post('/borrow/:id', bookController.borrowBook);

// Return a borrowed book route
router.post('/return/:copyId', bookController.returnBook);

// Add more book-related routes as needed

module.exports = router;
