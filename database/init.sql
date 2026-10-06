CREATE DATABASE IF NOT EXISTS newsdb;
USE newsdb;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  fullname VARCHAR(255) NOT NULL
);

INSERT INTO posts(title, description)
SELECT 'NodeJS', 'Lập trình backend với Node.js thuần'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'NodeJS');

INSERT INTO posts(title, description)
SELECT 'Web động', 'Server trả về nội dung tương ứng với request'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Web động');

INSERT INTO posts(title, description)
SELECT 'React', 'Lập trình giao diện frontend với React'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'React');

INSERT INTO posts(title, description)
SELECT 'Express', 'Xây dựng web với Express Framework'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Express');

INSERT INTO posts(title, description)
SELECT 'MVC', 'Tổ chức project theo mô hình MVC'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'MVC');

INSERT INTO posts(title, description)
SELECT 'REST API', 'API trả dữ liệu JSON cho frontend'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'REST API');

INSERT INTO users(username, password, fullname)
SELECT 'admin', '123456', 'Administrator'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');
