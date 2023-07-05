-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
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
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(20),
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

CREATE TABLE collectioncenters(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(40),
        managerid INT NOT NULL,
        inspectorid INT NOT NULL, 
        CONSTRAINT fk_manager_user FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_inspector_user FOREIGN KEY(inspectorid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE merchants(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(20),
        accountnumber VARCHAR(20),
        ifsccode VARCHAR(20),
        contactnumber VARCHAR(20),
        emailaddress VARCHAR(20),
        managerid INT NOT NULL,
        CONSTRAINT fk_manager_users FOREIGN KEY(managerid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
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
        collectionid INT,
        CONSTRAINT fk_shippingitems_shipment FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shippingitems_goodscollection FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

    CREATE TABLE ratecard(
        id INT  AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50),
        description VARCHAR(50),
        amount  DOUBLE
    );
CREATE TABLE goodscosting(
    id INT PRIMARY KEY AUTO_INCREMENT,
    shippingitemsid INT NOT NULL UNIQUE,
    freightcharges DOUBLE,
    labourcharges DOUBLE,
    serviceharges DOUBLE,
    CONSTRAINT fk_goodscosting_shippingitems FOREIGN KEY (shippingitemsid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE

);
CREATE PROCEDURE apply_labour_charges(IN shipping_items_id INT)
BEGIN
DECLARE labourcharges DOUBLE DEFAULT 0;
-- DECLARE collection_id INT DEFAULT 0;
-- DECLARE bags INT DEFAULT 0;
-- DECLARE labourrateperbag INT DEFAULT 0;
-- DECLARE container_type varchar(20);
-- SELECT collectionid INTO collection_id FROM shippingitems WHERE id=shipping_items_id;
-- SELECT containertype,quantity INTO container_type,bags FROM goodscollections WHERE id=collection_id;
-- SELECT amount INTO labourrateperbag FROM ratecard WHERE title=container_type;
-- SET labourcharges= bags * labourrateperbag ;

SELECT (goodscollections.quantity*ratecard.amount) INTO labourcharges FROM goodscollections
JOIN shippingitems ON goodscollections.id = shippingitems.collectionid
JOIN ratecard ON goodscollections.containertype = ratecard.title
WHERE shippingitems.id = shipping_items_id;

INSERT INTO goodscosting(shippingitemsid,labourcharges) VALUES (shipping_items_id,labourcharges);
END;

CREATE PROCEDURE apply_service_charges(IN shipping_items_id INT)
BEGIN
    UPDATE goodscosting
    JOIN shippingitems ON goodscosting.shippingitemsid = shippingitems.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
    JOIN ratecard ON ratecard.title = "servicecharges"
    SET goodscosting.servicecharges = verifiedgoodscollection.weight * ratecard.amount
    WHERE shippingitems.id = shipping_items_id;
END;

CREATE PROCEDURE apply_total_freight_charges(IN shipment_id INT, OUT total_freight_charges DOUBLE)
BEGIN
    SELECT (shipments.kilometer * ratecard.amount) INTO total_freight_charges
    FROM shipments
    INNER JOIN vehicles ON shipments.vehicleid = vehicles.id
    INNER JOIN ratecard ON vehicles.vehicletype = ratecard.title
    WHERE shipments.id = shipment_id;
END;

CREATE PROCEDURE apply_freight_charges_for_collection(IN shipment_id INT) 
BEGIN 
	DECLARE finished INT DEFAULT 0;
	DECLARE shipping_item_id INT DEFAULT 0;
	DECLARE freight_charges DOUBLE DEFAULT 0;
	DECLARE totalfreightcharges DOUBLE DEFAULT 0;
	DECLARE collection_weight DOUBLE DEFAULT 0;
	DECLARE total_collections_weight DOUBLE DEFAULT 0;
	DECLARE freight_rate_per_kg DOUBLE DEFAULT 0;

	DECLARE cursor_shipment_item_id CURSOR FOR
	SELECT id FROM shippingitems WHERE shipmentid = shipment_id;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	CALL apply_total_freight_charges(shipment_id,@total_freight_charges);
	SELECT @total_freight_charges INTO totalfreightcharges;

	SELECT SUM(weight) INTO total_collections_weight FROM verifiedgoodscollection
	INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
	WHERE shippingitems.shipmentid = shipment_id;

	SET freight_rate_per_kg=totalfreightcharges/total_collections_weight;

	OPEN cursor_shipment_item_id;
	updatefreightcharges: LOOP
	    FETCH cursor_shipment_item_id INTO shipping_item_id;

        IF finished = 1 THEN 
            LEAVE updatefreightcharges;
        END IF;

        SELECT weight INTO collection_weight FROM verifiedgoodscollection
        INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
        WHERE shippingitems.id = shipping_item_id;

        SET freight_charges = freight_rate_per_kg * collection_weight;

        UPDATE goodscosting SET freightcharges = freight_charges WHERE shippingitemsid = shipping_item_id;
	END LOOP updatefreightcharges;
	CLOSE cursor_shipment_item_id;
END; 




CREATE TABLE
    invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        merchantid INT,
        shippingitemsid INT,
        rate DOUBLE,
        totalamount DOUBLE,
        invoicedate DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_invoice_users FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_shippingItemsid FOREIGN KEY (shippingitemsid) REFERENCES shippingitems(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

      CREATE TABLE payments(
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
    CONSTRAINT fk_goodscollectionpayments_payments FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE  CASCADE ON DELETE CASCADE
);
CREATE TABLE goodsservicespayments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    collectionid INT,
    paymentid INT,
    CONSTRAINT fk_goodsservicespayments_goodscollections FOREIGN KEY (collectionid) REFERENCES goodscollections(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_goodsservicespayments_payments FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
);
 CREATE TABLE transporterpayments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipmentid INT,
    paymentid INT,
    CONSTRAINT fk_transporterpayments_shipment FOREIGN KEY (shipmentid) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_transporterpayments_payment FOREIGN KEY (paymentid) REFERENCES payments(id) ON UPDATE CASCADE ON DELETE CASCADE
);
