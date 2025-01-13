const Komentar = require('../models/Komentar');

exports.addKomentar = async (req, res) => {
  try {
    const { fotoID, userID, isiKomentar } = req.body;
    const komentar = new Komentar({ fotoID, userID, isiKomentar });
    await komentar.save();
    res.status(201).json(komentar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getKomentarByFoto = async (req, res) => {
  try {
    const { fotoID } = req.params;
    const komentar = await Komentar.find({ fotoID }).populate('userID', 'username');
    res.status(200).json(komentar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};