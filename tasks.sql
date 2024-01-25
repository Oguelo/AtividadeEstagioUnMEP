CREATE DATABASE IF NOT EXISTS TasksTable;


USE TasksTable;
  
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    date DATE,
    status VARCHAR(255)
)ENGINE = InnoDB;    





FLUSH PRIVILEGES;
