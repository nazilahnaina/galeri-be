const express = require('express');
const { createAlbum, getAlbums, deleteAlbum, getAlbumById} = require('../controllers/albumController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddlewere');  // Pastikan nama file dan fungsi benar

// Lindungi route dengan middleware autentikasi
router.post('/upload', authMiddleware, createAlbum);  // Mengharuskan login untuk membuat album
router.get('/', getAlbums);
router.get('/:id', getAlbumById);
router.delete('/:id', authMiddleware, deleteAlbum); // hapus

module.exports = router;
