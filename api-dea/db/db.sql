CREATE DATABASE IF NOT EXISTS dea;

USE dea;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

INSERT INTO roles (name) VALUES ('user');
INSERT INTO roles (name) VALUES ('admin');

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  edited_at TIME NULL,
  rol INT DEFAULT 1,
  FOREIGN KEY (rol) REFERENCES roles(id)
);

CREATE TABLE dea_points (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    lat VARCHAR(255) NOT NULL,
    lon VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    edited_at TIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    edited_at TIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
