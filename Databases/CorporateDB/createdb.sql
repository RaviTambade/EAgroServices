-- Active: 1682349138553@@127.0.0.1@3306@corporatedb
DROP DATABASE IF EXISTS CorporateDB;

CREATE DATABASE CorporateDB;

USE CorporateDB;

CREATE TABLE corporations(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        contactnumber VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(30) NOT NULL,
        personid INT NOT NULL 
    );
    