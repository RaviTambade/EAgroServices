-- Active: 1677341008727@@127.0.0.1@3306@eagroservicesdb

Drop DATABASE IF EXISTS eagroservicesdb;

CREATE DATABASE eagroservicesdb;

USE eagroservicesdb;

CREATE TABLE
    users(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        peopleid INT NOT NULL UNIQUE
    );

CREATE TABLE
    roles(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name varchar(20)
    );

CREATE TABLE
    userroles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userid INT NOT NULL,
        roleid INT NOT NULL,
        CONSTRAINT fk_userid FOREIGN KEY(userid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_roleid FOREIGN KEY(roleid) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    vendors(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        transportid INT NOT NULL,
        imageurl VARCHAR(50),
        CONSTRAINT fk_userid3 FOREIGN KEY(transportid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    CREATE TABLE
    vehiclestype(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR (30),
        rateperkm DOUBLE
    ); 

CREATE TABLE
    vehicles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        vendorid INT NOT NULL,
        vehicletype INT,
        vehiclenumber VARCHAR(15) NOT NULL UNIQUE,
        imageurl VARCHAR(50),
        CONSTRAINT fk_transportid FOREIGN KEY (vendorid) REFERENCES vendors(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_vehicletype FOREIGN KEY (vehicletype) REFERENCES vehiclestype(id) ON UPDATE CASCADE ON DELETE CASCADE
    );


CREATE TABLE
    labourcharges(
        containertype ENUM('crates', 'bags', 'lenobags') PRIMARY KEY,
        imageUrl VARCHAR(35),
        rate double NOT NULL
    );

CREATE TABLE
    crops(
        id int NOT Null AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(20) NOT NULL UNIQUE,
        imageurl VARCHAR(30) NOT NULL,
        rate DOUBLE NOT NULL DEFAULT 0
    );

CREATE TABLE
    collections(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        farmerid INT NOT NULL,
        cropid INT NOT NULL,
        containertype ENUM('crates', 'bags', 'lenobags'),
        quantity INT NOT NULL,
        totalweight DOUBLE NOT NULL,
        collectiondate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_farmerid FOREIGN KEY (farmerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_cropid FOREIGN KEY (cropid) REFERENCES crops(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_containertype FOREIGN KEY(containertype) REFERENCES labourcharges(containertype) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    collectioninspection(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectionid INT NOT NULL,
        grade ENUM ('A', 'B', 'C', 'D'),
        weight DOUBLE,
        inspectorid INT,
        CONSTRAINT fk_collectionid FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_inspectorid FOREIGN KEY (inspectorid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        inspectiondate DATETIME NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    shipments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        vehicleid INT,
        merchantid INT,
        kilometer INT,
        shipmentdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_vehicleid FOREIGN KEY (vehicleid) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_merchantid FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    shipingitems(
        id INT AUTO_INCREMENT PRIMARY KEY,
        shitpmentid INT,
        collectionid INT,
        frieghtcharges DOUBLE,
        labourcharges DOUBLE,
        CONSTRAINT fk_shitpmentid FOREIGN KEY (shitpmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_collectionid2 FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE
    );


CREATE TABLE
    billing (
        id INT AUTO_INCREMENT PRIMARY KEY,
        merchantid INT,
        shipingitemsid INT,
        rate DOUBLE,
        totalamount DOUBLE,
        billdate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_merchantid2 FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shipingItemsid FOREIGN KEY (shipingitemsid) REFERENCES shipingitems(id) ON UPDATE CASCADE ON DELETE CASCADE
    );