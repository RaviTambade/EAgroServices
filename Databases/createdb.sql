-- Active: 1682349138553@@127.0.0.1@3306@eagroservicesdb

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
        CONSTRAINT fk_userrole FOREIGN KEY(userid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_userroles FOREIGN KEY(roleid) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    transporters(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        corporateid INT NOT NULL UNIQUE,
        managerid INT NOT NULL,
        CONSTRAINT fk_manageruser FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    vehicles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        transporterid INT NOT NULL,
        vehicletype VARCHAR (30),
        rtonumber VARCHAR(15) NOT NULL UNIQUE,
        CONSTRAINT fk_vehicles_transporters FOREIGN KEY (transporterid) REFERENCES transporters(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    crops(
        id int NOT Null AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(20) NOT NULL UNIQUE,
        imageurl VARCHAR(30) NOT NULL,
        rate DOUBLE NOT NULL DEFAULT 0
    );

CREATE TABLE
    collectioncenters(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        corporateid INT NOT NULL UNIQUE,
        inspectorid INT NOT NULL,
        CONSTRAINT fk_inspector_user FOREIGN KEY(inspectorid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    merchants(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        corporateid INT NOT NULL UNIQUE,
        managerid INT NOT NULL,
        CONSTRAINT fk_manager_users FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    goodscollections(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectioncenterid INT,
        farmerid INT NOT NULL,
        cropid INT NOT NULL,
        containertype ENUM('crates','bags','polythene bags'),
        quantity INT NOT NULL,
        weight DOUBLE NOT NULL,
        collectiondate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_farmer_users FOREIGN KEY (farmerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_goodscollection_crops FOREIGN KEY (cropid) REFERENCES crops(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_goodscollection_collectioncenter FOREIGN KEY(collectioncenterid) REFERENCES collectioncenters(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    verifiedgoodscollection(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectionid INT NOT NULL,
        grade ENUM ('A', 'B', 'C', 'D'),
        weight DOUBLE,
        inspectorid INT,
        CONSTRAINT fk_verified_goodscollections FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_inspector_users FOREIGN KEY (inspectorid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        inspectiondate DATETIME NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    shipments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        vehicleid INT,
        merchantid INT,
        kilometers INT,
        shipmentdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_shipment_vehicle FOREIGN KEY (vehicleid) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shipment_users FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    shippingitems(
        id INT AUTO_INCREMENT PRIMARY KEY,
        shipmentid INT,
        collectionid INT UNIQUE,
        CONSTRAINT fk_shippingitems_shipment FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shippingitems_goodscollection FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    ratecard(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) UNIQUE,
        description VARCHAR(50),
        amount DOUBLE
    );

CREATE TABLE
    goodscosting(
        id INT PRIMARY KEY AUTO_INCREMENT,
        shippingitemid INT NOT NULL UNIQUE,
        freightcharges DOUBLE,
        labourcharges DOUBLE,
        servicecharges DOUBLE,
        CONSTRAINT fk_goodscosting_shippingitems FOREIGN KEY (shippingitemid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shippingitemid INT UNIQUE,
        rate DOUBLE,
        totalamount DOUBLE DEFAULT 0,
        invoicedate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_shippingItemsid FOREIGN KEY (shippingitemid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    payments(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        transactionid INT NOT NULL UNIQUE,
        amount DOUBLE NOT NULL
    );

CREATE TABLE
    goodscollectionpayments(
        id INT AUTO_INCREMENT PRIMARY KEY,
        collectionid INT,
        paymentid INT,
        CONSTRAINT fk_goodscollectionpayments FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_goodscollectionpayments_payments FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    goodsservicespayments(
        id INT AUTO_INCREMENT PRIMARY KEY,
        collectionid INT,
        paymentid INT,
        CONSTRAINT fk_goodsservicespayments_goodscollections FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_goodsservicespayments_payments FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    transporterpayments(
        id INT AUTO_INCREMENT PRIMARY KEY,
        shipmentid INT,
        paymentid INT,
        CONSTRAINT fk_transporterpayments_shipment FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_transporterpayments_payment FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );