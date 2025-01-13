const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  fotoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tanggalLike: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', LikeSchema);
