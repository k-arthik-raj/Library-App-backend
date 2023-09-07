const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = await User.create({ username, password, email });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      
      if (user) {
        // User exists and credentials are valid
        // Define the payload including the user's role (is_admin)
        const payload = {
          userId: user._id,
          is_admin: user.is_admin, // Include the user's role
        };
        
        // Generate a JWT token with the payload
        // Modify the secret key
        const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
        
        res.json({ success: true, token }); 
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },

  //... Other user related controller methods

};

module.exports = userController;
