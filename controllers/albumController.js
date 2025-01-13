const Album = require('../models/Album');

exports.createAlbum = async (req, res) => {
  try {
    const { namaAlbum, deskripsi, userID } = req.body;
    const album = new Album({ namaAlbum, deskripsi, userID });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('userID', 'username');
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};