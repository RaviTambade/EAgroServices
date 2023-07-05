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
   transporters(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(20),
        managerid INT NOT NULL,
        CONSTRAINT fk_managerid3 FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- CREATE TABLE
--     vehiclestype(
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         type VARCHAR (30),
--         rateperkm DOUBLE
--     );

CREATE TABLE
    vehicles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        transporterid INT NOT NULL,
        vehicletype VARCHAR (30),
        rtonumber VARCHAR(15) NOT NULL UNIQUE,
        CONSTRAINT fk_transportid FOREIGN KEY (transporterid) REFERENCES transporters(id) ON UPDATE CASCADE ON DELETE CASCADE,
    );

-- CREATE TABLE
--     labourcharges(
--         containertype ENUM('crates', 'bags', 'lenobags') PRIMARY KEY,
--         imageUrl VARCHAR(35),
--         rate double NOT NULL
--   ratecardid, title,description amount  );

CREATE TABLE
    crops(
        id int NOT Null AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(20) NOT NULL UNIQUE,
        imageurl VARCHAR(30) NOT NULL,
        rate DOUBLE NOT NULL DEFAULT 0
    );

CREATE TABLE collectioncenters(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(20),
        managerid INT NOT NULL,
        inspectorid INT NOT NULL, 
        CONSTRAINT fk_managerid3 FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT fk_inspectorid FOREIGN KEY(inspectorid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE merchants(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(20),
        managerid INT NOT NULL,
        CONSTRAINT fk_managerid3 FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
);
CREATE TABLE
    goodscollections(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectioncenterid INT,
        farmerid INT NOT NULL,
        cropid INT NOT NULL,
        containertype ENUM('crates', 'bags', 'lenobags'),
        quantity INT NOT NULL,
        weight DOUBLE NOT NULL,
        collectiondate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_farmerid FOREIGN KEY (farmerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_cropid FOREIGN KEY (cropid) REFERENCES crops(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_containertype FOREIGN KEY(containertype) REFERENCES labourcharges(containertype) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT fk_collectioncenterid FOREIGN KEY(collectioncenterid) REFERENCES labourcharges(containertype) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    verifiedgoodscollection(
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
    shippingitems(
        id INT AUTO_INCREMENT PRIMARY KEY,
        shipmentid INT,
        collectionid INT,
        CONSTRAINT fk_shipmentid FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_collectionid2 FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE goodscosting(
    id INT PRIMARY KEY AUTO_INCREMENT,
    shippingitemsid INT NOT NULL,
    frieghtcharges DOUBLE,
    labourcharges DOUBLE,
    ownercharges DOUBLE,
    CONSTRAINT fk_shippingitemsid1 FOREIGN KEY (shippingitemsid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE

);

CREATE TABLE
    invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        merchantid INT,
        shippingitemsid INT,
        rate DOUBLE,
        totalamount DOUBLE,
        invoicedate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_merchantid2 FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shippingItemsid FOREIGN KEY (shippingitemsid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

      CREATE TABLE payments(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        transactionid INT NOT NULL UNIQUE,
        Amount DOUBLE NOT NULL
    );
CREATE TABLE
goodscollectionpayments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    collectionid INT,
    paymentid INT,
    CONSTRAINT fk_collectionid3 FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_paymentid FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE  CASCADE ON DELETE CASCADE
);
CREATE TABLE goodsservicespayments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    collectionid INT,
    paymentid INT,
    CONSTRAINT fk_collectionid4 FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_paymentid1 FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
);
 CREATE TABLE transporterpayments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipmentid INT,
    paymentid INT,
    CONSTRAINT fk_shipmentid3 FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_paymentid2 FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
);
