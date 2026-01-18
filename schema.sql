CREATE DATABASE IF NOT EXISTS desafio_fullstack
    DEFAULT CHARSET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;

USE desafio_fullstack;

-- Usuarios para login (JWT)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Entidade principal
CREATE TABLE IF NOT EXISTS carbono_ator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    documento VARCHAR(50) NOT NULL UNIQUE,
    tipo VARCHAR(50) NULL,
    email VARCHAR(120) NULL,
    telefone VARCHAR(30) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

