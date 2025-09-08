
# Tugas Rumah Mata Kuliah Pengembangan Web Service
> author: Asyura Azzahra Djola - 20230140231

## Table of Content
- [Deskripsi Program](#deskripsi-program)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Project Documentation](#project-documentation)

## Deskripsi Program
Aplikasi web sederhana yang terdiri dari basis data MySQL, API dengan Node.js (Express.js), dan antarmuka HTML + JavaScript.

## Project Structure
```
TUGASPWS2/
├── node_modules/         # Folder dependency Node.js (otomatis, jangan diubah manual)
├── public/               # File statis (HTML, gambar, dll)
│   └── index.html        # Halaman utama (bisa untuk uji coba FE sederhana)
├── uploads/              # Folder penyimpanan file hasil upload (misal: gambar produk)
├── .env                  # Konfigurasi environment (PORT, DB connection, dll)
├── .gitignore            # File/folder yang diabaikan Git (misal: node_modules)
├── db.js                 # File koneksi database
├── package-lock.json     # Auto-generated, lock versi dependency
├── package.json          # Konfigurasi project & daftar dependency
├── README.md             # Dokumentasi project
├── server.js             # Entry point backend (Express server & routing)
└── tugaspsws.sql         # Script SQL (struktur & data awal database)
```

## How to Run
1. Clone Repository (Jalankan di dalam WSL)
   ```
   git clone https:
   cd tugasrumah_20230140231
   ```
2. Set Up MySQL Workbench
   - Buat database di MySQL Workbench dengan nama `data`
   - Import file `tugaspws.sql` dari repository ini
3. Set Up Env
   - Buka file `.env` di root project.
   - Sesuaikan PORT, DB_HOST, DB_USER, dan DB_PASSWORD dengan konfigurasi MySQL Workbench kamu
5. Install dependencies
   ```
   npm install
   ```
6. Run Project
   ```
   node server.js
   ```

## Project Documentation
| Page | Screenshot |
|---|---|
| **Input Page** |<img width="1877" height="883" alt="image" src="https://github.com/user-attachments/assets/41f980bd-85a1-4f4f-825a-f6f9f0251c54" />

| **Daftar Data** |<img width="1859" height="879" alt="image" src="https://github.com/user-attachments/assets/a7154487-d8ef-4a5a-a508-e798b41c87a8" />

| **Hasil respons JSON dari GET /api/records** |<img width="1363" height="848" alt="image" src="https://github.com/user-attachments/assets/235290a9-ce01-4359-a868-18b7f4639cf1" />

