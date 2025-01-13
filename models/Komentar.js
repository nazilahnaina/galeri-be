const mongoose = require('mongoose');

const KomentarSchema = new mongoose.Schema({
  fotoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isiKomentar: { type: String, required: true },
  tanggalKomentar: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Komentar', KomentarSchema);
