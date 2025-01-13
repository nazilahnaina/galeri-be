const express = require('express');
const { addLike, getLikesByFoto } = require('../controllers/likeController');
const router = express.Router();

// Route to add a like
router.post('/', addLike);

// Route to get all likes for a specific photo
router.get('/:fotoID', getLikesByFoto);

module.exports = router;
