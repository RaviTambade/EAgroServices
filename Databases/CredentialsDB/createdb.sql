-- Active: 1682349138553@@127.0.0.1@3306@credentialsdb
DROP DATABASE IF EXISTS credentialsDB;
CREATE DATABASE  credentialsDB;
USE credentialsDB;
CREATE TABLE credentials(id INT PRIMARY KEY AUTO_INCREMENT,
                         contactnumber  VARCHAR(15) UNIQUE,
                         password VARCHAR(25), 
                         createdon DATETIME DEFAULT CURRENT_TIMESTAMP,
                         modifiedon DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);