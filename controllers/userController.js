const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, namaLengkap, alamat } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, email, namaLengkap, alamat });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    

    res.status(200).json({ message: 'Login successful', token,user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Token Blacklist Storage (for demo purposes)
let tokenBlacklist = [];

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(400).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Extract Bearer token
    tokenBlacklist.push(token);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to Check if Token is Blacklisted
exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.includes(token);
};
