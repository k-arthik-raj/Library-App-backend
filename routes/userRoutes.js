const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdminToken } = require('../middlewares/authMiddleware'); 

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Add more user-related routes as needed

module.exports = router;
