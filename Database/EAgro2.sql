-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb

Drop DATABASE IF EXISTS eagroservicesdb;
CREATE DATABASE eagroservicesdb;
USE eagroservicesdb;
CREATE TABLE
    users(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        contactnumber VARCHAR(15) NOT NULL UNIQUE,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        imageurl VARCHAR(35),
        aadharid VARCHAR(20),
        password varchar(15) NOT NULL
    );

CREATE TABLE addresses(id INT AUTO_INCREMENT PRIMARY KEY,
                       state VARCHAR(15) NOT NULL,
                       district VARCHAR(15) NOT NULL,
                       tahsil VARCHAR(15) NOT NULL,
                       village VARCHAR(15) NOT NULL,
                       userid INT NOT NULL,
        CONSTRAINT fk_userid1 FOREIGN KEY(userid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
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
CREATE TABLE vendors(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      companyname VARCHAR(20),
      transportid INT NOT NULL,
      imageurl VARCHAR(50),
      CONSTRAINT fk_userid3 FOREIGN KEY(transportid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE vehicles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        vendorid INT NOT NULL,
        vehiclenumber VARCHAR(15) NOT NULL UNIQUE,
        imageurl VARCHAR(50),
        CONSTRAINT fk_transportid FOREIGN KEY (vendorid) REFERENCES vendors(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
-- ALTER TABLE trucks ADD  CONSTRAINT userid_check CHECK (transportId IN (SELECT userid FROM userRoles WHERE roleId = 2));

CREATE TABLE
    labourrates(
        containertype ENUM('crates', 'bags', 'lenobags') PRIMARY KEY,
        imageUrl VARCHAR(35),
        rate double NOT NULL
    );
    CREATE TABLE crops(
         id int NOT Null AUTO_INCREMENT PRIMARY KEY,
         title VARCHAR(20)NOT NULL UNIQUE,
         imageurl VARCHAR(30) NOT NULL,
         rate DOUBLE NOT NULL DEFAULT 0
   );
 
CREATE TABLE
    collections(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        farmerid INT NOT NULL,
        cropid INT NOT NULL,
        containertype ENUM('crates','bags','lenobags'),
        quantity INT NOT NULL,
        grade ENUM('A','B','C','D'),
        totalweight DOUBLE NOT NULL,
        tareweight DOUBLE NOT NULL,
        netweight DOUBLE AS (totalweight - tareweight),
        rateperkg DOUBLE,
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_farmerid FOREIGN KEY (farmerid)  REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_cropid FOREIGN KEY (cropid)  REFERENCES crops(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_containertype FOREIGN KEY(containertype) REFERENCES labourrates(containertype) ON UPDATE CASCADE ON DELETE CASCADE
    );
 CREATE TABLE
    billing(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectionid INT NOT NULL,
        labourcharges DOUBLE DEFAULT 0,
        totalamount DOUBLE DEFAULT 0,
        CONSTRAINT fk_collectionid FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        date DATETIME NOT NULL DEFAULT NOW() 
    );
CREATE TABLE
    sells(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        collectionid INT NOT NULL,
        merchantid INT,
        vehicleid INT,
        quantity INT NOT NULL,
        netweight DOUBLE NOT NULL,
        rateperkg DOUBLE NOT NULL DEFAULT 0,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_collectionid2 FOREIGN KEY (collectionid) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_merchantid FOREIGN KEY (merchantid) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_vehicleid FOREIGN KEY (vehicleid) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    SELECT * FROM sells;
   CREATE TABLE
    sellsbilling(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sellid INT NOT NULL,
        freightcharges DOUBLE DEFAULT 0,
        labourcharges DOUBLE NOT NULL DEFAULT 0,
        totalcharges DOUBLE AS(
            freightcharges + labourcharges
        ),
        totalAmount DOUBLE DEFAULT 0,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_sellid FOREIGN KEY (sellid) REFERENCES sells(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    SELECT * FROM sellsbilling;

CREATE TABLE freightrates (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fromdestination VARCHAR(50) NOT NULL,
  todestination VARCHAR(50) NOT NULL,
  kilometers INT NOT NULL,
  rateperkm DOUBLE NOT NULL,
  billid INT NOT NULL,
  CONSTRAINT fk_billid FOREIGN KEY (billid) REFERENCES sellsBilling(id) ON UPDATE CASCADE ON DELETE CASCADE
);
SELECT * FROM freightrates;
 
 /* query for calculating freight charges of one truck */
-- SELECT sells.sell_id,sells.truck_id,sells_billing.freight_charges,sells.quantity,sells.date 
-- from sells,sells_billing
-- WHERE sells.sell_id=sells_billing.sell_id and sells.truck_id=1;

CREATE TABLE
    payments(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        transactionid INT NOT NULL,
        billid INT NOT NULL,
        CONSTRAINT fk_bill1id FOREIGN KEY (billid) REFERENCES billing(id) ON UPDATE CASCADE ON DELETE CASCADE
    );


/* for calculating labour_charges */
CREATE PROCEDURE ApplyLabourCharges(IN billId INT) BEGIN 
	DECLARE labourRate DOUBLE DEFAULT 0;
	DECLARE Quantity INT DEFAULT 0;
	DECLARE collection_Id INT ;
	SELECT collectionid INTO collection_Id FROM billing WHERE id = billId;
    SELECT rate INTO labourRate FROM labourrates,collections WHERE  collections.id= collection_Id AND labourrates.containertype=collections.containertype;
    SELECT collections.quantity INTO Quantity  FROM collections WHERE collections.id = collection_Id;
    UPDATE billing SET labourcharges = labourRate * Quantity WHERE id = billId;
END;
/* for calculating total_amount  */ 
CREATE PROCEDURE DeductLabourChargesFromRevenue(billId INT)
 BEGIN 
	DECLARE revenue DOUBLE DEFAULT 0 ;
    DECLARE labour_Charges DOUBLE DEFAULT 0;
	DECLARE collection_Id INT;
	SELECT collectionid INTO collection_Id FROM billing WHERE id = billId;
    SELECT labourcharges INTO labour_Charges FROM billing WHERE id = billId;
	SELECT collections.netweight * collections.rateperkg INTO revenue
	FROM collections WHERE id = collection_Id;
	UPDATE billing
	SET totalamount = revenue - labour_Charges
	WHERE id = billId;
   END; 
-- drop PROCEDURE calculate_purchase_total_amount;
  /* --for calculating freight_charges  */
CREATE PROCEDURE ApplyFreightCharges(IN billId INT)
    BEGIN 
	DECLARE totalFreightCharges DOUBLE;
	SELECT freightrates.kilometers * freightrates.rateperkm INTO totalFreightCharges
	FROM freightrates WHERE freightrates.billid = billId  ;
	UPDATE sellsbilling
	SET freightcharges = totalFreightCharges
	WHERE sellsbilling.id = billId;
END; 

-- DROP PROCEDURE calculate_labour_charges_of_sells;
CREATE PROCEDURE ApplyLabourChargesToBilling(IN billId INT) 
BEGIN 
UPDATE 
    sellsbilling 
    INNER JOIN sells ON sellsbilling.sellid = sells.id
    INNER JOIN collections ON sells.collectionid = collections.id
    INNER JOIN labourrates ON collections.containertype = labourrates.containertype 
SET 
    sellsbilling.labourcharges = collections.quantity * labourrates.rate
WHERE 
    sellsbilling.id =billId;
END;
CREATE PROCEDURE ApplyTotalAmount(billId INT)
 BEGIN 
	DECLARE total_charges DOUBLE DEFAULT 0 ;
    DECLARE totalAmount DOUBLE DEFAULT 0;
    DECLARE sell_id INT;
	SELECT sellid INTO sell_id FROM sellsbilling WHERE id = billId;
    SELECT totalcharges INTO total_charges FROM sellsbilling WHERE id = billId;
	SELECT sells.netweight * sells.rateperkg INTO totalAmount
	FROM sells WHERE id = sell_id;
	UPDATE sellsbilling
	SET totalamount = totalAmount + total_charges
	WHERE id = billId;
END; 

INSERT INTO labourrates(containertype,imageurl,rate)VALUES('crates','/assets/images/crates.jpeg',5);
INSERT INTO labourrates(containertype,imageurl,rate)VALUES('bags','/assets/images/bags.jpeg',6);
INSERT INTO labourrates(containertype,imageurl,rate)VALUES('lenobags','/assets/images/lenobags.jpeg',4);
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9078678767', 'password','Sahil','Mankar','/assets/images/sahilmankar.jpeg','565645455676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9898909090', 'password','Anuja','Waghule','/assets/images/sahilmankar.jpeg','565645325676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9000909807', 'password','Shubham','Teli','/assets/images/sahilmankar.jpeg','565612345676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('7448022740', 'password','Urmila','Toke','/assets/images/sahilmankar.jpeg','565909085676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9090890890', 'password','Dipali','Toke','/assets/images/sahilmankar.jpeg','565645409086');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9000989899', 'password','Akshay','Tanpure','/assets/images/sahilmankar.jpeg','565645412126');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9000945459', 'password','Sunil','Erande','/assets/images/sahilmankar.jpeg','565645412326');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9023239899', 'password','Anil','Kale','/assets/images/sahilmankar.jpeg','565645344446');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9012349899', 'password','Sagar','Kale','/assets/images/sahilmankar.jpeg','565641234376');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9456989899', 'password','Sachin','Navale','/assets/images/sahilmankar.jpeg','561234555676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9006789899', 'password','Vaibhav','Chakkar','/assets/images/sahilmankar.jpeg','565645457112');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9009090899', 'password','Vaibhav','Bajare','/assets/images/sahilmankar.jpeg','565645423232');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9000909009', 'password','Sham','Erande','/assets/images/sahilmankar.jpeg','565645412321');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9000912349', 'password','Nikhil','Erande','/assets/images/sahilmankar.jpeg','565645009090');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('7800989899', 'password','Sagar','Kudale','/assets/images/sahilmankar.jpeg','565645656656');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9123459899', 'password','Vitthal','Kale','/assets/images/sahilmankar.jpeg','565641112376');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8788664324', 'password','Rohit','Gore','/assets/images/sahilmankar.jpeg','565645654376');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('7898090989', 'password','Vedant','Yadav','/assets/images/sahilmankar.jpeg','565641234376');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8887654567', 'password','Akash','Ajab','/assets/images/sahilmankar.jpeg','565611232446');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8989098909', 'password','Pragati','Bangar','/assets/images/sahilmankar.jpeg','565645678876');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8789889098', 'password','Pratik','Karale','/assets/images/sahilmankar.jpeg','565645451234');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9643235646', 'password','Akash','More','/assets/images/sahilmankar.jpeg','565645453456');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8975321245', 'password','Jayesh','Erande','/assets/images/sahilmankar.jpeg','565645490906');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9765321245', 'password','Prajwal','Erande','/assets/images/sahilmankar.jpeg','534545455676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('8987765456', 'password','Rushi','Chikane','/assets/images/sahilmankar.jpeg','565234555676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9908999878', 'password','Sunny','Teli','/assets/images/sahilmankar.jpeg','565656765676');
INSERT INTO users(contactnumber, password,firstname,lastname,imageurl,aadharid)VALUES('9788788777', 'password','Bhushan','Erande','/assets/images/sahilmankar.jpeg','123445455676');
SELECT * FROM users;
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Ambegaon','Bhavadi',1);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Ambegaon','Awasari',2);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Ambegaon','Bhavadi',3);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Ambegaon','Bhavadi',4);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Khed','Wada',5);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Khed','Kalus',6);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Junnar','Ozar',7);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Satara','Karad','Sainagar',8);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Satara','Wai','Shaniwarpeth',9);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Satara','Man','Shastrinagar',10);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Kolhapur','Shahuwadi','Rajarampuri',11);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Kolhapur','Panhala','Fulewadi',12);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Kolhapur','Shirol','Kalamba',13);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Miraj','Tasgaon',14);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',16);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',17);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',18);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',19);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',20);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Walwa','Visapur',21);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Jat','Palus',22);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Jat','Palus',23);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Jat','Palus',24);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Jat','Palus',25);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Sangli','Jat','Palus',26);
INSERT INTO addresses(state,district,tahsil,village,userid)VALUES('Maharashtra','Pune','Ambegaon','Karegaon',27);

INSERT INTO roles(name)VALUES('admin');
INSERT INTO roles(name)VALUES('farmer');
INSERT INTO roles(name)VALUES('employee');
INSERT INTO roles(name)VALUES('transport');
INSERT INTO roles(name)VALUES('merchant');
INSERT INTO userRoles(userid,roleId)VALUES(1,1);
INSERT INTO userRoles(userid,roleId)VALUES(2,1);
INSERT INTO userroles(userid,roleid)VALUES(3,2);
INSERT INTO userroles(userid,roleid)VALUES(4,2);
INSERT INTO userroles(userid,roleid)VALUES(5,2);
INSERT INTO userroles(userid,roleid)VALUES(6,2);
INSERT INTO userroles(userid,roleid)VALUES(7,2);
INSERT INTO userroles(userid,roleid)VALUES(8,2);
INSERT INTO userroles(userid,roleid)VALUES(9,2);
INSERT INTO userroles(userid,roleid)VALUES(10,2);
INSERT INTO userroles(userid,roleid)VALUES(11,2);
INSERT INTO userroles(userid,roleid)VALUES(12,2);
INSERT INTO userroles(userid,roleid)VALUES(13,2);
INSERT INTO userroles(userid,roleid)VALUES(14,2);
INSERT INTO userroles(userid,roleid)VALUES(15,2);
INSERT INTO userroles(userid,roleid)VALUES(16,2);
INSERT INTO userroles(userid,roleid)VALUES(17,3);
INSERT INTO userroles(userid,roleid)VALUES(18,3);
INSERT INTO userroles(userid,roleid)VALUES(19,3);
INSERT INTO userroles(userid,roleid)VALUES(20,4);
INSERT INTO userroles(userid,roleid)VALUES(21,4);
INSERT INTO userroles(userid,roleid)VALUES(22,4);
INSERT INTO userroles(userid,roleid)VALUES(23,4);
INSERT INTO userroles(userid,roleid)VALUES(24,5);
INSERT INTO userroles(userid,roleid)VALUES(25,5);
INSERT INTO userroles(userid,roleid)VALUES(26,5);
INSERT INTO userroles(userid,roleid)VALUES(27,5);



--  INSERT INTO admins(first_name,last_name,location,userid)VALUES('Ashok','Bajare','Bhavadi',1);
--  INSERT INTO admins(first_name,last_name,location,userid)VALUES('Ashok','Chakkar','Bhavadi',2);
--  INSERT INTO admins(first_name,last_name,location,userid)VALUES('Ashok','Chakkar','Bhavadi',3);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Akshay','Tanpure','Wada',4);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Akshay','Chakkar','Bhavadi',5);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Akshay','Bajare','Kudalewadi',6);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Akshay','Mankar','Bhavadi',7);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Akshay','Kudale','Kudalewadi',8);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Abhay','Mankar','Kudalewadi',9);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Aniket','Tanpure','Pargaon',10);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Sagar','Tanpure','Bhavadi',11);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Sahil','Mankar','Bhavadi',12);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Sahil','Teli','Bhavadi',13);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Shubham','Tanpure','Pargaon',29);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Sohil','Chakkar','Pargaon',30);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Suresh','Chakkar','Bhavadi',31);
-- INSERT INTO farmers(first_name,last_name,location,userid)VALUES ('Sumit','Mankar','Kudalewadi',32);
--  INSERT INTO employees(first_name,last_name,location,salary,userid)VALUES('Abhay','Navale','Bhavadi',15000,14);
--  INSERT INTO employees(first_name,last_name,location,salary,userid)VALUES('Shubham','Teli','Bhavadi',15000,15);
--  INSERT INTO employees(first_name,last_name,location,salary,userid)VALUES('Sahil','Mankar','Bhavadi',15000,16);
--  INSERT INTO employees(first_name,last_name,location,salary,userid)VALUES('shubham','Navale','Bhavadi',15000,17);
--  INSERT INTO employees(first_name,last_name,location,salary,userid)VALUES('Abhay','Kale','Bhavadi',15000,18);
--  INSERT INTO transports(office_name,first_name,last_name,location,userid)VALUES('OM Transports','Ashok','Chakkar','Karegaon',19);
--  INSERT INTO transports(office_name,first_name,last_name,location,userid)VALUES('Waghule Transport','Sahil','Mankar','Bahirwadi',20);
-- INSERT INTO transports(office_name,first_name,last_name,location,userid)VALUES('Navale Transport','Abhay','Navale','Bahirwadi',21);
-- INSERT INTO transports(office_name,first_name,last_name,location,userid)VALUES('Karale Transport','Abhay','Karale','Karegaon',22);
-- INSERT INTO transports(office_name,first_name,last_name,location,userid)VALUES('Sakore Transport','Shubham','Teli','Chas',23);
INSERT INTO vendors(companyname,imageurl,transportid) VALUES ("OM Transports",'/assets/images/goodstransport.jpeg',20);
INSERT INTO vendors(companyname,imageurl,transportid) VALUES ("Navale Transport",'/assets/images/goodstransport1.jpeg',21);
INSERT INTO vendors(companyname,imageurl,transportid) VALUES ("Karale Transport",'/assets/images/goodstransport2.jpeg',22);
INSERT INTO vendors(companyname,imageurl,transportid) VALUES ("Sakore Transport",'/assets/images/sakoretransport.jpeg',23);
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(1, 'MH14RE3456','/assets/images/truck.jpg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(2, 'MH14RE3455','/assets/images/truck1.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(2, 'MH14RE3465','/assets/images/truck2.webp');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(1, 'MH14RE3476','/assets/images/truck3.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(1, 'MH14RE3856','/assets/images/transport.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(1, 'MH14RE4656','/assets/images/transport1.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(3,'MH14RE1234','/assets/images/transport2.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,imageurl)VALUES(3,'MH14RE2345','/assets/images/transport3.jpeg');
-- INSERT INTO merchants(company_name,first_name,last_name,location,userid)VALUES ('Zatka Company','Ramesh','Gawade','Manchar',24);
-- INSERT INTO merchants(company_name,first_name,last_name,location,userid)VALUES ('HemantKumar Company','Hemant','Pokharkar','Manchar',25);
-- INSERT INTO merchants(company_name,first_name,last_name,location,userid)VALUES ('Nighot Company','Anuj','Nighot','Manchar',26);
-- INSERT INTO merchants(company_name,first_name,last_name,location,userid)VALUES ('Madivale Company','Suresh','Nighot','Mumbai',27);
-- INSERT INTO merchants(company_name,first_name,last_name,location,userid)VALUES ('Sidhhivinayk Company','Raju','shinde','Pune',28);
INSERT INTO crops(title,imageurl,rate)VALUES('Potato','/assets/images/potato.jpeg',32);
INSERT INTO crops(title,imageurl,rate)VALUES('Tomato','/assets/images/tomato.jpeg',12);
INSERT INTO crops(title,imageurl,rate)VALUES('Cabbage','/assets/images/cabbage.jpeg',21);
INSERT INTO crops(title,imageurl,rate)VALUES('Onion','/assets/images/onion.jpg',22);
INSERT INTO crops(title,imageurl,rate)VALUES('Bitroot','/assets/images/beetroot.jpeg',30);
INSERT INTO crops(title,imageurl,rate)VALUES('Beans','/assets/images/beans.jpeg',29);
INSERT INTO crops(title,imageurl,rate)VALUES('Brinjal','/assets/images/Brinjal.jpeg',29);
INSERT INTO crops(title,imageurl,rate)VALUES('wheat','/assets/images/wheat.jpeg',29);



INSERT INTO collections (farmerid, cropid, containertype, quantity, grade, totalweight, tareweight, rateperkg, date) VALUES 
(3, 2, 'bags', 40, 'B', 200, 8, 20, '2022-01-20 13:30:00'),
(3, 1, 'crates', 50, 'A', 250, 10, 18.5, '2022-01-03 10:00:00'),
(3, 3, 'lenobags', 120, 'C', 600, 24, 19.5, '2022-02-02 09:45:00'),
(3, 4, 'crates', 75, 'D', 375, 15, 16.5, '2022-02-07 14:00:00'),
(3, 5, 'bags', 30, 'A', 150, 6, 22, '2022-03-04 11:15:00'),
(3, 1, 'lenobags', 100, 'B', 500, 20, 18.5, '2022-03-09 15:00:00'),
(3, 2, 'crates', 60, 'C', 300, 12, 20.5, '2022-04-05 10:30:00'),
(3, 3, 'bags', 45, 'D', 225, 9, 19, '2022-04-08 13:45:00'),
(3, 4, 'lenobags', 80, 'A', 400, 16, 18, '2022-05-02 09:00:00'),
(3, 5, 'crates', 65, 'B', 325, 13, 21, '2022-05-09 12:15:00'),
(3, 1, 'bags', 55, 'C', 275, 11, 20, '2022-06-03 08:30:00'),
(3, 2, 'lenobags', 150, 'D', 750, 30, 16.5, '2022-06-08 11:45:00'),
(3, 3, 'crates', 85, 'A', 425, 17, 18, '2022-07-05 14:00:00'),
(3, 4, 'bags', 70, 'B', 350, 14, 19.5, '2022-07-08 17:15:00'),
(3, 5, 'lenobags', 200, 'C', 1000, 40, 16, '2022-08-02 10:30:00'),
(3, 1, 'crates', 110, 'D', 550, 22, 18, '2022-08-09 13:45:00'),
(3, 2,'bags', 90, 'A', 450, 18, 21.5, '2022-09-05 08:00:00'),
(3, 3, 'crates', 50, 'B', 250, 10, 20, '2022-09-08 11:15:00'),
(3, 4, 'lenobags', 120, 'C', 600, 24, 19, '2022-10-03 14:30:00'),
(3, 5, 'crates', 75, 'D', 375, 15, 17, '2022-10-06 17:45:00'),
(3, 1, 'bags', 60, 'A', 300, 12, 22.5, '2022-11-02 10:00:00'),
(3, 2, 'lenobags', 90, 'B', 450, 18, 19, '2022-11-07 13:15:00'),
(3, 3, 'crates', 80, 'C', 400, 16, 20.5, '2022-12-05 09:30:00'),
(3, 4, 'bags', 100, 'D', 500, 20, 18, '2022-12-08 12:45:00'),
(3, 5, 'lenobags', 150, 'A', 750, 30, 17.5, '2023-01-03 08:00:00'),
(3, 1, 'crates', 65, 'B', 325, 13, 20, '2023-01-06 11:15:00'),
(3, 2, 'bags', 45, 'C', 225, 9, 21.5, '2023-02-02 14:30:00'),
(3, 3, 'lenobags', 80, 'D', 400, 16, 18.5, '2023-02-07 17:45:00'),
(3, 4, 'crates', 110, 'A', 550, 22, 17, '2023-03-07 10:00:00'),
(3, 5, 'bags', 95, 'B', 475, 19, 19.5, '2023-03-10 13:15:00'),
(4, 1, 'lenobags', 200, 'C', 1000, 40, 17, '2023-04-03 09:30:00'),
(4, 2, 'crates', 75, 'D', 375, 15, 16.5, '2023-04-06 12:45:00'),
(4, 3, 'bags', 50, 'A', 250, 10, 22, '2023-05-02 08:00:00'),
(4, 4, 'lenobags', 120, 'B', 600, 24, 19, '2023-05-05 11:15:00'),
(4, 4, 'bags', 120, 'B', 600, 24, 19, '2023-06-12 11:15:00'),
(4, 4, 'bags', 120, 'B', 600, 34, 34, '2023-06-12 11:15:00'),
(3, 4, 'bags', 120, 'B', 500, 12, 34, '2023-06-12 11:15:00'),
(3, 4, 'bags', 120, 'B', 300, 67, 45, '2023-06-12 11:15:00'),
(5, 1, 'bags', 120, 'B', 400, 45, 23, '2023-06-26 11:15:00'),
(5, 2, 'bags', 120, 'B', 700, 34, 23, '2023-06-26 11:15:00'),
(6, 3, 'crates', 120, 'B', 800, 23, 22, '2023-06-26 11:15:00'),
(4, 4, 'crates', 120, 'B', 600, 24, 19, '2023-06-26 11:15:00'),
(4, 5, 'bags', 120, 'B', 600, 34, 34, '2023-06-26 11:15:00'),
(6, 6, 'bags', 120, 'B', 500, 12, 34, '2023-06-26 11:15:00'),
(5, 5, 'lenobags', 120, 'B', 300, 67, 45, '2023-06-26 11:15:00'),
(4, 4, 'bags', 120, 'B', 400, 45, 23, '2023-06-26 11:15:00'),
(6, 7, 'bags', 120, 'B', 700, 34, 23, '2023-06-26 11:15:00'),
(5, 8, 'bags', 120, 'B', 800, 23, 22, '2023-06-26 11:15:00');


INSERT INTO billing (collectionid,date)
SELECT id,date FROM collections  order by id ;

INSERT INTO sells(collectionid, merchantid, vehicleid, quantity, netweight, rateperkg, date) VALUES
(1, 24, 1, 10, 50, 34, '2022-03-15'),
(2, 24, 2, 15, 75, 20, '2022-05-21'),
(3, 24, 3, 8, 40, 23, '2022-07-07'),
(4, 25, 4, 12, 60, 22, '2022-08-12'),
(5, 25, 5, 5, 25, 25, '2022-09-29'),
(6, 25, 6, 20, 100, 26, '2022-10-16'),
(7, 25, 1, 18, 90, 27, '2022-11-25'),
(8, 25, 2, 7, 35, 28, '2022-12-03'),
(9, 26, 3, 14, 70, 30, '2022-12-21'),
(10, 27, 4, 9, 45, 36, '2023-01-08'),
(11, 27, 5, 11, 55, 38, '2023-02-14'),
(12, 27, 6, 6, 30, 39, '2023-03-02'),
(13, 27, 1, 13, 65, 46, '2023-03-19'),
(14, 26, 2, 16, 80, 12, '2023-04-06'),
(15, 26, 3, 4, 20, 24, '2023-04-23'),
(16, 26, 4, 19, 95, 19, '2023-05-10'),
(17, 26, 5, 8, 40, 56, '2023-05-27'),
(18, 26, 6, 11, 55, 34, '2023-06-13'),
(19, 24, 1, 7, 35, 89, '2023-06-30'),
(20, 25, 2, 15, 75, 23, '2023-04-17'),
(21, 26, 3, 10, 50, 67, '2023-03-03'),
(22, 27, 4, 12, 60, 63, '2023-02-20'),
(23, 24, 5, 9, 45, 52, '2023-01-06'),
(24, 25, 6, 6, 30, 43, '2023-06-23'),
(25, 26, 1, 16, 80, 64, '2023-03-10'),
(26, 27, 2, 5, 25, 43, '2023-03-27'),
(27, 24, 3, 18, 90, 66, '2023-02-13'),
(28, 25, 4, 10, 50, 50, '2023-01-30'),
(29, 26, 5, 13, 65, 56, '2023-02-14'),
(30, 27, 6, 8, 40, 69, '2023-05-14'),
(31, 27, 1, 11, 55, 52, '2023-06-14'),
(32, 25, 2, 14, 70, 60, '2023-06-14');

INSERT INTO sellsbilling(sellid,date)
SELECT id,date FROM sells LIMIT 42;


INSERT INTO freightrates(fromdestination, todestination, kilometers, rateperkm, billid) VALUES
('Mumbai', 'Pune', 150, 25, 1),
('Mumbai', 'Nagpur', 800, 20, 2),
('Mumbai', 'Nashik', 170, 15, 3),
('Mumbai', 'Kolhapur', 380, 28, 4),
('Mumbai', 'Aurangabad', 350, 25, 5),
('Mumbai', 'Solapur', 440, 24, 6),
('Mumbai', 'Amravati', 790, 28, 7),
('Mumbai', 'Jalgaon', 420, 29, 8),
('Mumbai', 'Akola', 660, 30, 9),
('Mumbai', 'Ratnagiri', 340, 32, 10),
('Mumbai', 'Dhule', 370, 35, 11),
('Mumbai', 'Ahmednagar', 280, 36, 12),
('Mumbai', 'Sangli', 410, 40, 13),
('Mumbai', 'Mumbai', 49, 47, 14),
('Mumbai', 'Thane', 30, 59, 15),
('Mumbai', 'Nagpur', 800, 69, 16),
('Mumbai', 'Pune', 150, 80, 17),
('Mumbai', 'Nashik', 170, 68, 18),
('Mumbai', 'Kolhapur', 380, 15.8, 19),
('Mumbai', 'Aurangabad', 350, 14.6, 20),
('Mumbai', 'Solapur', 440, 17.3, 21),
('Mumbai', 'Amravati', 790, 20.0, 22),
('Mumbai', 'Jalgaon', 420, 16.5, 23),
('Mumbai', 'Akola', 660, 19.8, 24),
('Mumbai', 'Ratnagiri', 340, 14.2, 25),
('Mumbai', 'Dhule', 370, 15.5, 26),
('Mumbai', 'Ahmednagar', 280, 12.6, 27),
('Mumbai', 'Sangli', 410, 16.0, 28),
('Mumbai', 'Mumbai', 0, 0.0, 29),
('Mumbai', 'Thane', 30, 5.0, 30),
('Mumbai', 'Nagpur', 800, 20.2, 31),
('Mumbai', 'Pune', 150, 10.5, 32);


DROP PROCEDURE IF EXISTS call_procedures;
CREATE PROCEDURE call_procedures(IN records INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= records DO
    CALL ApplyLabourCharges(i);
    CALL DeductLabourChargesFromRevenue(i);
    SET i = i + 1;
  END WHILE;
END;


CALL call_procedures(48);


DROP PROCEDURE IF EXISTS call_proceduresofsells;
CREATE PROCEDURE call_proceduresofsells(IN records INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= records DO
    CALL ApplyFreightCharges(i);
    CALL ApplyLabourChargesToBilling(i);
    CALL ApplyTotalAmount(i);
    SET i = i + 1;
  END WHILE;
END;

CALL call_proceduresofsells(48);

/*
-- SELECT farmers.first_name,farmers.last_name,farmers.location,farmer_purchases.variety,farmer_purchases.quantity,farmer_purchases.total_weight,farmer_purchases.tare_weight,farmer_purchases.net_weight,farmer_purchases.`date`,transport_trucks.truck_number,sells.net_weight,sells.rate_per_kg,sells.total_amount FROM farmers
-- INNER JOIN farmer_purchases On farmers.farmer_id=farmer_purchases.farmer_id 
-- INNER JOIN sells on farmer_purchases.purchase_id=sells.purchase_id 
-- INNER JOIN transport_trucks ON sells.truck_id=transport_trucks.truck_id 
--  WHERE farmers.farmer_id=1;



-- for farmer sell toatal amount

-- select farmer_purchases.farmer_id, sum(farmer_purchases_billing.total_amount) ,MONTHNAME(farmer_purchases.date) as month from farmer_purchases_billing 
-- inner join farmer_purchases on farmer_purchases.purchase_id=farmer_purchases_billing.purchase_id
-- where farmer_id=2 group by MONTHNAME(farmer_purchases.date);

--for monthwise sell of variety of farmer
-- select farmer_purchases.farmer_id, varieties.variety_name , sum(farmer_purchases_billing.total_amount),MONTHNAME(farmer_purchases.date) as month    from farmer_purchases_billing 
-- inner join farmer_purchases on farmer_purchases.purchase_id=farmer_purchases_billing.purchase_id
-- inner join varieties on varieties.variety_id=farmer_purchases.variety_id
-- where farmer_id=2 group by farmer_purchases.variety_id, MONTHNAME(farmer_purchases.date) order by  varieties.variety_name  ;

--daily sale of farmer 
-- select farmer_purchases.farmer_id, varieties.variety_name , sum(farmer_purchases_billing.total_amount),date(farmer_purchases.date) as month    from farmer_purchases_billing 
-- inner join farmer_purchases on farmer_purchases.purchase_id=farmer_purchases_billing.purchase_id
-- inner join varieties on varieties.variety_id=farmer_purchases.variety_id
-- where farmer_id=2 group by farmer_purchases.variety_id, date(farmer_purchases.date) order by  farmer_purchases.date  ;
-- SELECT sells.sell_id,sells.merchant_id,sells_billing.total_charges,freight_rates.id FROM sells INNER JOIN sells_billing ON sells_billing.sell_id=sells.sell_id INNER JOIN freight_rates ON sells_billing.bill_id=freight_rates.bill_id WHERE sells.sell_id=5;


--SELECT merchants.merchant_id,SUM(sells.total_amount),MONTHNAME(sells.date) AS month FROM merchants INNER JOIN sells ON merchants.merchant_id=sells.merchant_id WHERE merchants.merchant_id=2 GROUP BY MONTHNAME(sells.date);


--day wise freight_charges of a truck
--  SELECT
--     transport_trucks.truck_id,
--     DATE(sells.date) AS date,
--     SUM(
--         sells_billing.freight_charges
--     )
-- FROM transport_trucks
--     INNER JOIN sells ON transport_trucks.truck_id = sells.truck_id
--     INNER JOIN sells_billing ON sells.sell_id = sells_billing.sell_id
-- WHERE sells.truck_id = 2
-- ORDER BY date;

-- SELECT SUM(sells.total_amount),MONTHNAME(sells.date) AS date FROM merchants INNER JOIN sells ON merchants.merchant_id=sells.sell_id WHERE sells.sell_id=1;

--  SELECT transport_trucks.truck_number,sells_billing.freight_charges,sells_billing.`date` 
--  from transports INNER JOIN transport_trucks on transports.transport_id=transport_trucks.transport_id
-- INNER JOIN sells ON sells.truck_id=transport_trucks.truck_id
-- INNER join sells_billing on sells.sell_id=sells_billing.sell_id
-- WHERE transports.transport_id=2;
SELECT * FROM employees;
SELECT * FROM admins;
SELECT * FROM users;
SELECT * FROM sells_billing;

---- monthwise trucks bill total of a transport per year
SELECT 
transports.transport_id,sum(sells_billing.freight_charges),MONTHNAME(sells_billing.date) ,transport_trucks.truck_number,year(sells_billing.date) from sells_billing
INNER JOIN sells on sells.sell_id=sells_billing.sell_id
INNER join transport_trucks on transport_trucks.truck_id=sells.truck_id
INNER JOIN transports on transports.transport_id=transport_trucks.transport_id
where transports.transport_id=1
GROUP BY  year(sells_billing.date), MONTHNAME(sells_billing.date),transport_trucks.truck_number ORDER BY year(sells_billing.date) ;

-- yearwise trucks bill total of a transport
SELECT 
transports.transport_id,sum(sells_billing.freight_charges),transport_trucks.truck_number,year(sells_billing.date) from sells_billing
INNER JOIN sells on sells.sell_id=sells_billing.sell_id
INNER join transport_trucks on transport_trucks.truck_id=sells.truck_id
INNER JOIN transports on transports.transport_id=transport_trucks.transport_id
where transports.transport_id=2
GROUP BY  year(sells_billing.date),transport_trucks.truck_number ORDER BY year(sells_billing.date) ;
*/

SELECT users.firstname,users.lastname,userroles.roleid,roles.name FROM users INNER JOIN userroles ON users.id=userroles.userid INNER JOIN roles ON userroles.roleid=roles.id WHERE roles.name="merchant";
SELECT * FROM roles;

SELECT * FROM collections;
SELECT * FROM billing;
SELECT * FROM sells;
SELECT * FROM vehicles;
SELECT * FROM freightrates;
SELECT * FROM sellsbilling;
SELECT * FROM sells;
SELECT * FROM vehicles;
SELECT * FROM vendors;
SELECT sellsbilling.freightcharges,freightrates.fromdestination,freightrates.todestination,
freightrates.kilometers,sells.quantity,
freightrates.rateperkm from vehicles 
INNER JOIN sells ON vehicles.id=sells.vehicleid 
INNER JOIN sellsbilling ON sells.id=sellsbilling.sellid
INNER JOIN freightrates ON sellsbilling.id=freightrates.billid WHERE vehicles.id=1;

SELECT * FROM collections;

    SELECT CONCAT(users.firstname,users.lastname) AS farmer ,crops.title,collections.containertype,
collections.grade,collections.quantity,collections.totalweight,collections.tareweight,collections.netweight,
collections.rateperkg,collections.date FROM users INNER JOIN collections
ON users.id=collections.farmerid 
INNER JOIN crops
ON crops.id=collections.cropid WHERE collections.date >= CURRENT_DATE;


SELECT * FROM users;
SELECT * FROM collections;


SELECT CONCAT(users.firstname,' ',users.lastname) FROM users INNER JOIN addresses
ON users.id=addresses.userid WHERE addresses.state='Maharashtra' AND addresses.district='Sangli'
AND addresses.tahsil='Jat' AND addresses.village='Bhavadi';

SELECT district FROM addresses WHERE state="Maharashtra";
SELECT tahsil FROM addresses WHERE district="Pune";
SELECT village FROm addresses WHERE tahsil="Junnar";

 SELECT `a`.`district`
      FROM `addresses` AS `a`
      WHERE `a`.`state` = "Maharashtra";

       SELECT  `a`.`tahsil`
      FROM `addresses` AS `a`
      WHERE `a`.`district` = "Pune";
SELECT * FROM addresses WHERE userid=10;
SELECT vendors.companyname,users.firstname,users.lastname,users.imageurl,users.contactnumber,users.aadharid
FROM  vendors INNER JOIN users on vendors.transportid=users.id
WHERE vendors.transportid=11;
SELECT * FROM users;
SELECT * FROM userroles;
SELECT * FROM roles;
SELECT * FROM vendors;
SELECT * FROM vehicles;
SELECT * FROM sells;
SELECT * FROM payments;

SELECT users.firstname,users.lastname,users.contactnumber,users.imageurl,users.contactnumber, vendors.companyname FROM users
INNER JOIN vendors on vendors.transportid=users.id WHERE users.id=21;
  SELECT `c0`.`title` AS `CropName`, `c`.`containertype` AS `ContainerType`, `s`.`quantity` AS `Quantity`, `c`.`grade` AS `Grade`, `s`.`netweight` AS `NetWeight`, `s`.`rateperkg` AS `RatePerKg`, `v`.`vehiclenumber` AS `VehicleNumber`, `s`.`date` AS `Date`
      FROM `users` AS `u`
      INNER JOIN `sells` AS `s` ON `u`.`id` = `s`.`merchantid`
      INNER JOIN `collections` AS `c` ON `s`.`collectionid` = `c`.`id`    
      INNER JOIN `crops` AS `c0` ON `c`.`cropid` = `c0`.`id`
      INNER JOIN `vehicles` AS `v` ON `s`.`vehicleid` = `v`.`id`
      WHERE `s`.`merchantid` = 24
      ORDER BY `s`.`date` DESC;

SELECT sells.netweight,sells.quantity,sells.rateperkg,sells.`date`,vehicles.vehiclenumber,users.firstname,users.lastname FROM sells 
INNER JOIN vehicles ON sells.vehicleid=vehicles.id
INNER JOIN users on sells.merchantid=users.id WHERE vehicles.id=3;
SELECT * FROM users;


 SELECT `v0`.`id`, `v0`.`imageurl`, `v0`.`vehiclenumber`, `v0`.`vendorid`
      FROM `vendors` AS `v`
      INNER JOIN `vehicles` AS `v0` ON `v`.`id` = `v0`.`vendorid`
      WHERE `v`.`id` = 1;