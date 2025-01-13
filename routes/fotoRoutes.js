const express = require('express');
const upload = require('../config/multerConfig'); // Path ke konfigurasi Multer
const fotoController = require('../controllers/fotoController'); // Path ke controller

const router = express.Router();

// Rute untuk upload foto
router.post('/uploadFoto', upload.single('image'), fotoController.uploadFoto);

module.exports = router;
