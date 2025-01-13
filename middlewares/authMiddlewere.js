const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/userController'); // Sesuaikan nama fungsi

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  // Periksa apakah token di-blacklist
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Simpan payload yang terverifikasi
    next(); // Lanjutkan ke middleware berikutnya atau handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
