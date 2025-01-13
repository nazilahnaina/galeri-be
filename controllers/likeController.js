const Like = require('../models/Like');

exports.addLike = async (req, res) => {
  try {
    const { fotoID, userID } = req.body;
    const like = new Like({ fotoID, userID });
    await like.save();
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLikesByFoto = async (req, res) => {
  try {
    const { fotoID } = req.params;
    const likes = await Like.find({ fotoID });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
