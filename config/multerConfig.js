const multer = require('multer');

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // Maksimal ukuran file 10MB
  });
  

module.exports = upload;
