const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Untuk memeriksa isi req.body
        const { username, password, email, namaLengkap, alamat } = req.body;

        const user = new User({ username, password, email, namaLengkap, alamat });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Bandingkan password (harus di-hash untuk keamanan, tetapi di sini plain text sesuai kode Anda)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret Key
      { expiresIn: '1h' } // Masa berlaku token
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simpan token blacklist dalam memori sederhana untuk contoh ini
let tokenBlacklist = [];

exports.logoutUser = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ message: 'No token provided' });

    // Tambahkan token ke daftar blacklist
    tokenBlacklist.push(token);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware untuk memeriksa token blacklist
exports.checkToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }
  next();
};
