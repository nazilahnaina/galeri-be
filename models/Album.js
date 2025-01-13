
const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  namaAlbum: { type: String, required: true },
  deskripsi: { type: String },
  tanggalDibuat: { type: Date, default: Date.now },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Album', AlbumSchema);
