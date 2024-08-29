-- This schema is for the remote DB on the UK server
-- Use this to recreate the abnext database

CREATE TABLE archives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    server_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    archive_id INT NOT NULL,
    user_id TEXT NOT NULL,
    server_id TEXT NOT NULL,
    content TEXT NOT NULL,             -- Encrypted content
    iv VARBINARY(16) NOT NULL,         -- Store the Initialisation Vector (12 bytes for AES-GCM)
    tag VARBINARY(16) NOT NULL,        -- Store the authentication tag (16 bytes)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archives(id)
);
