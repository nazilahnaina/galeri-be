const mongoose = require('mongoose');

const FotoSchema = new mongoose.Schema({
  judulFoto: { type: String, required: true },
  deskripsiFoto: { type: String },
  tanggalUnggah: { type: Date, default: Date.now },
  lokasiFile: { type: String, required: true },
  albumID: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Foto', FotoSchema);
