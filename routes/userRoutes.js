const express = require('express');
const { registerUser, getUsers, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddlewere');

// Tambahkan log untuk memastikan route dipanggil
console.log('User routes loaded.');

// Register User
router.post('/register', (req, res, next) => {
  console.log('Register route hit!', req.body);
  next();
}, registerUser);

// Get All Users
router.get('/', (req, res, next) => {
  console.log('Get all users route hit!');
  next();
}, getUsers);

// Login User
router.post('/login', (req, res, next) => {
  console.log('Login route hit!', req.body);
  next();
}, loginUser);

// Logout User (Dilindungi Middleware)
router.post('/logout', authMiddleware, (req, res, next) => {
  console.log('Logout route hit!');
  next();
}, logoutUser);

// Rute yang dilindungi
router.get('/protected', authMiddleware, (req, res) => {
  console.log(`Protected route hit by user ID: ${req.user.id}`);
  res.json({ message: `Welcome, user with ID: ${req.user.id}` });
});

module.exports = router;
