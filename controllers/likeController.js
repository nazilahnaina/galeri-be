const Like = require('../models/Like');
const mongoose =require("mongoose")

exports.addLike = async (req, res) => {
  try {
    const { fotoID, userID } = req.body;  // Memastikan data diterima dalam body
    if (!fotoID || !userID) {
      return res.status(400).json({ message: 'fotoID dan userID diperlukan' });
    }
    const like = new Like({ fotoID, userID });
    await like.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLikesByFoto = async (req, res) => {
  try {
    const fotoID = req.params.fotoID.trim();  // Menghapus karakter newline
    if (!mongoose.Types.ObjectId.isValid(fotoID)) {
      return res.status(400).json({ message: 'fotoID tidak valid' });
    }
    const likes = await Like.find({ fotoID }).populate('userID', 'username');
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// hapus like/unlike
exports.toggleLike = async (req, res) => {
  try {
    const { fotoID, userID } = req.body;
    if (!fotoID || !userID) {
      return res.status(400).json({ message: 'fotoID dan userID diperlukan' });
    }

    const existingLike = await Like.findOne({ fotoID, userID });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: 'Unlike berhasil.' });
    }

    const like = new Like({ fotoID, userID });
    await like.save();
    res.status(201).json({ message: 'Like berhasil.', like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

