// komentarController.js
const Komentar = require('../models/Komentar');

exports.addKomentar = async (req, res) => {
  try {
    const { fotoID, isiKomentar } = req.body;
    console.log( req.body);
    
    const userID = req.user.id
    const komentar = new Komentar({ fotoID, userID, isiKomentar });
    await komentar.save();
    res.status(201).json(komentar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getKomentarByFoto = async (req, res) => {
  try {
    const userID = req.user.id
    const komentar = await Komentar.find({ userID }).populate('userID', 'username');
    res.status(200).json(komentar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hapus komentar berdasarkan ID
exports.deleteKomentar = async (req, res) => {
  try {
    const { id } = req.params;
    const komentar = await Komentar.findById(id);

    if (!komentar) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan' });
    }

    // Hanya penulis komentar atau admin yang dapat menghapus komentar
    if (req.user.id !== komentar.userID.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus komentar ini' });
    }

    await komentar.deleteOne();
    res.json({ message: 'Komentar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

