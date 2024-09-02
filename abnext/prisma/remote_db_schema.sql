DROP DATABASE abnext;
CREATE DATABASE abnext;

USE abnext;

CREATE TABLE archives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid TEXT NOT NULL,
    server_id TEXT NOT NULL,
    server_name TEXT NOT NULL,
    channel_name TEXT NOT NULL,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    archive_id INT NOT NULL,
    message_id TEXT NOT NULL,
    author TEXT NOT NULL,
    author_id TEXT NOT NULL,
    avatar_hash TEXT,
    content JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
