const express = require('express');
const { addLike, getLikesByFoto, toggleLike } = require('../controllers/likeController');
const router = express.Router();

// Route untuk menambahkan like
router.post('/', addLike);

// Route untuk mendapatkan semua like berdasarkan fotoID
router.get('/:fotoID', getLikesByFoto);
// hapus like
router.post('/toggle', toggleLike);

module.exports = router;

