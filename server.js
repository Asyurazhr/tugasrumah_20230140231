require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const pool = require("./db"); // mysql2/promise pool

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve /public
app.use(express.static(path.join(__dirname, "public")));

// ensure /uploads exists + serve it
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(uploadDir));

// Multer storage (save to /uploads with safe filename)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeOriginal = path.basename(file.originalname).replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeOriginal);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  // fileFilter: (req, file, cb) => {
  //   const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
  //   cb(ok ? null : new Error("File harus gambar (jpg/png/webp)"), ok);
  // },
});

// CREATE
app.post("/api/records", upload.single("gambar"), async (req, res) => {
  try {
    const { nama, tinggi_badan, tanggal } = req.body;
    if (!nama || !tinggi_badan || !tanggal) {
      return res.status(400).json({ error: "nama, tinggi_badan, dan tanggal wajib diisi" });
    }

    const gambarPath = req.file ? "/uploads/" + req.file.filename : null;

    const [result] = await pool.execute(
      "INSERT INTO profile (nama, tinggi_badan, tanggal, gambar_path) VALUES (?, ?, ?, ?)",
      [nama.trim(), parseInt(tinggi_badan, 10), tanggal, gambarPath]
    );

    res.json({ message: "Data berhasil disimpan", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menyimpan data" });
  }
});

// READ ALL
app.get("/api/records", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM profile ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// (Opsional) READ by id
app.get("/api/records/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM profile WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
