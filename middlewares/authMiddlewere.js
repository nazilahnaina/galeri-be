const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/userController'); // Sesuaikan nama fungsi

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, "210906nzlh"); // Pastikan kunci sesuai
    req.user = decoded;
    console.log('User data:', req.user); 
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
