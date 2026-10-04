-- Open this file in MySQL Workbench and click the Execute (⚡) button:

CREATE DATABASE IF NOT EXISTS elearning_db;
USE elearning_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course VARCHAR(50) NOT NULL,
    topic_index INT NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    UNIQUE KEY course_topic (course, topic_index)
);
