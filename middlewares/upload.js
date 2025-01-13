const multer = require('../config/multerConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Konfigurasi penyimpanan dengan Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Format file yang diizinkan
  },
});

const upload = multer({ storage });

module.exports = upload;
