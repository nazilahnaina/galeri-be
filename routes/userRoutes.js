const express = require('express');
const { registerUser, getUsers, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddlewere');


router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);


// Rute yang dilindungi
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user with ID: ${req.user.id}` });
});


module.exports = router;
