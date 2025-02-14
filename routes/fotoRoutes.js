const express = require('express');
const upload = require('../config/multerConfig');
const fotoController = require('../controllers/fotoController');

const router = express.Router();

// Route untuk upload foto
router.post('/uploadFoto', upload.single('image'), fotoController.uploadFoto);

// Route untuk delete foto
router.delete('/:id', fotoController.deleteFoto);

module.exports = router;
