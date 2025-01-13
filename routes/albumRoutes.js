const express = require('express');
const { createAlbum, getAlbums } = require('../controllers/albumController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddlewere');

router.post('/upload', authMiddleware, createAlbum);


router.post('/upload', createAlbum);
router.get('/', getAlbums);

module.exports = router;                         
