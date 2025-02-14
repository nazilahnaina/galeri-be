const Foto = require('../models/Foto');
const cloudinary = require('../config/cloudinary');

exports.uploadFoto = async (req, res) => {
  try {
    const { judulFoto, deskripsiFoto, albumID, userID } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const lokasiFile = uploadResult.secure_url;

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

// const Foto = require("../models/Foto");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// // Konfigurasi Cloudinary (pastikan ENV sudah diatur)
// exports.uploadFoto = async (req, res) => {
//   try {
//     const { judulFoto, deskripsiFoto, albumID, userID } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload ke Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "galeri",
//     });

//     // Hapus file lokal setelah diupload ke Cloudinary
//     fs.unlinkSync(req.file.path);

//     const foto = new Foto({
//       judulFoto,
//       deskripsiFoto,
//       lokasiFile: uploadResult.secure_url, // Simpan URL Cloudinary ke database
//       albumID,
//       userID,
//     });

//     await foto.save();

//     res.status(201).json({
//       message: "Image uploaded successfully",
//       foto,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to upload image",
//       error: error.message,
//     });
//   }
// };



// Fungsi Delete Foto
exports.deleteFoto = async (req, res) => {
  const fotoId = req.params.id;

  try {
    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }

    // Hapus dari Cloudinary jika file disimpan di sana
    const publicId = foto.lokasiFile.split('/').pop().split('.')[0]; // Dapatkan public ID
    await cloudinary.uploader.destroy(`uploads/${publicId}`);

    // Hapus dari database
    await Foto.findByIdAndDelete(fotoId);

    res.status(200).json({ message: 'Foto berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus foto', error: error.message });
  }
};
