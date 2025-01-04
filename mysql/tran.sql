CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;

CREATE TABLE entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount INT NOT NULL,
  description VARCHAR(255) NOT NULL
);


CREATE USER IF NOT EXISTS 'crud'@'%' IDENTIFIED BY 'CrudApp1';
GRANT ALL ON crud_app.* TO 'crud'@'%';
FLUSH PRIVILEGES;
