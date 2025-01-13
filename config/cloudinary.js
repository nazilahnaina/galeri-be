const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Dari akun Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,       // Dari akun Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET, // Dari akun Cloudinary
});

module.exports = cloudinary;
