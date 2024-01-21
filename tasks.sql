
CREATE DATABASE IF NOT EXISTS TasksTable;


USE TasksTable;
  
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    status ENUM('pending', 'running', 'completed') DEFAULT 'pending' NOT NULL

);
ENGINE = InnoDB;



FLUSH PRIVILEGES;
