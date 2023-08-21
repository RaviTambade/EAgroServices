-- Active: 1682349138553@@127.0.0.1@3306@bankingdb
DROP DATABASE IF EXISTS  BankingDB;

CREATE DATABASE BankingDB;
USE BankingDB;

CREATE TABLE customers(id INT AUTO_INCREMENT PRIMARY KEY,
                       customerid INT NOT NULL UNIQUE,
                       dependencyid INT NOT NULL,
                       usertype ENUM("corporation","person") NOT NULL
                       );
CREATE TABLE accounts(id INT PRIMARY KEY AUTO_INCREMENT,
					  acctnumber VARCHAR(20) NOT NULL,
                      accttype ENUM('savings','business','current'),
                      ifsccode VARCHAR(20),
                      balance DOUBLE,
                      registereddate DATE ,
                      customerid INT NOT NULL,
                      CONSTRAINT fk_customerid FOREIGN KEY(customerid) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE
                      );
                      
CREATE TABLE operations(operationid INT PRIMARY KEY AUTO_INCREMENT,
					  acctId INT NOT NULL,
                      CONSTRAINT fk_acctId FOREIGN KEY(acctId) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE,
                       acctnumber VARCHAR(20) NOT NULL,
                      amount DOUBLE,
                      operationdate DATETIME ,
                      operationmode CHAR
                      );

CREATE TABLE
    transactions(
        id INT PRIMARY KEY AUTO_INCREMENT,
        fromoperationid INT NOT NULL,
        tooperationid INT NOT NULL,
        CONSTRAINT fk_operationid FOREIGN KEY(fromoperationid) REFERENCES operations(operationid) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_rooperationid FOREIGN KEY(tooperationid) REFERENCES operations(operationid) ON UPDATE CASCADE ON DELETE CASCADE
    );

