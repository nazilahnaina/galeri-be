const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddlewere'); // Pastikan middleware ini sesuai
const { addKomentar, getKomentarByFoto, deleteKomentar } = require('../controllers/komentarController');

const router = express.Router();
// Endpoint untuk menambahkan komentar pada foto (POST)
router.post('/', authMiddleware, addKomentar); // Memastikan addKomentar adalah function

// Endpoint untuk mendapatkan komentar berdasarkan ID foto (GET)
router.get('/:fotoID', authMiddleware, getKomentarByFoto);
//hapus komentar 
router.delete('/:id', authMiddleware, deleteKomentar);

module.exports = router;