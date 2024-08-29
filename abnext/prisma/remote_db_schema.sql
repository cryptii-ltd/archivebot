-- This schema is for the remote DB on the UK server
-- Use this to recreate the abnext database

CREATE DATABASE abnext;

USE abnext;

CREATE TABLE archives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    server_id VARCHAR(18) NOT NULL,
    user_id VARCHAR(18) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    archive_id INT NOT NULL,
    user_id VARCHAR(18) NOT NULL,
    server_id VARCHAR(18) NOT NULL,
    content TEXT NOT NULL,                              -- Encrypted content
    iv VARBINARY(16) NOT NULL,                          -- Initialization Vector (12 bytes for AES-GCM)
    tag VARBINARY(16) NOT NULL,                         -- Authentication tag (16 bytes)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archives(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
