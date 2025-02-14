const Album = require("../models/Album");

exports.createAlbum = async (req, res) => {
  try {

    const { namaAlbum, description } = req.body;

    const userID = req.user?.id; // Pastikan req.user tidak undefined
    console.log("hayo: ", req.body);
    
    if (!namaAlbum || !userID) {
      return res.status(400).json({ message: "Nama album dan userID wajib diisi" });
    }

    const album = new Album({namaAlbum, deskripsi:description, userID });
    await album.save();

    console.log("Album berhasil dibuat:", album);
    res.status(201).json({ message: "Album berhasil dibuat", album });
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};


exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('userID', 'username').exec();

    if (!albums || albums.length === 0) {
      return res.status(404).json({ message: "Tidak ada album yang ditemukan" });
    }

    console.log(`Berhasil mengambil ${albums.length} album ${albums}`); // Log jumlah album
    res.status(200).json(albums);
  } catch (error) {
    console.error("Error saat mengambil daftar album:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};

exports.getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id).populate("userID", "username").exec();

    if (!album) {
      console.log(`Album dengan ID ${id} tidak ditemukan`);
      return res.status(404).json({ message: "Album tidak ditemukan" });
    }

    console.log("Album ditemukan:", album);
    res.status(200).json(album);
  } catch (error) {
    console.error("Error saat mengambil album:", error);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};

exports.deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id).exec();

    if (!album) {
      console.log(`Album dengan ID ${id} tidak ditemukan, tidak bisa dihapus`);
      return res.status(404).json({ message: "Album tidak ditemukan" });
    }

    await Album.deleteOne({ _id: id });
    console.log(`Album dengan ID ${id} berhasil dihapus`);
    res.status(200).json({ message: "Album berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus album:", error);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};
