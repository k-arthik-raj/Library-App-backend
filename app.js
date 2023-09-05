const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express
const app = express();

// Connect to MongoDB (update the MongoDB connection URL)
mongoose.connect('mongodb://127.0.0.1:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000 // Set a timeout of 5 seconds
});


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes); // User-related routes
app.use('/books', bookRoutes); // Book-related routes

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
