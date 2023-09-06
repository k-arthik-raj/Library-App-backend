const User = require('../models/userModel');

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
        res.json({ success: true });
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
