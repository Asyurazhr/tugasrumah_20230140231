create database data;
use data;

CREATE TABLE profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(50),
    tinggi_badan INT,
    tanggal DATE,
    gambar_path VARCHAR(255)
);

select * from profile