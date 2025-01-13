const Foto = require('../models/Foto');
const cloudinary = require('../config/cloudinary');

exports.uploadFoto = async (req, res) => {
  try {
    const { judulFoto, deskripsiFoto, albumID, userID } = req.body;

    // Periksa apakah ada file yang diunggah
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file ke Cloudinary dari buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' }, // Opsi folder di Cloudinary
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Dapatkan URL dari hasil upload
    const lokasiFile = uploadResult.secure_url;

    // Simpan data foto ke MongoDB
    const foto = new Foto({
      judulFoto,
      deskripsiFoto,
      lokasiFile,
      albumID,
      userID,
    });
    await foto.save();

    res.status(201).json({
      message: 'Image uploaded successfully',
      foto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};
