-- Active: 1677341008727@@127.0.0.1@3306@eagroservicesdb
Drop DATABASE IF EXISTS eagroservicesdb;
CREATE DATABASE eagroservicesdb;
USE eagroservicesdb;

CREATE TABLE
    users(
        user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        contact_number VARCHAR(15) NOT NULL UNIQUE,
        password varchar(15) NOT NULL
    );
CREATE TABLE
    roles(
        role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        role_name varchar(20)
    );
CREATE TABLE
    user_roles(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
        role_id INT NOT NULL,
        CONSTRAINT fk_role_id FOREIGN KEY(role_id) REFERENCES roles(role_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    accounts(
        account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_number VARCHAR(20),
        ifsc_code VARCHAR(20),
        user_id INT NOT NULL,
        CONSTRAINT fk_user8_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    farmers(
        farmer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        location VARCHAR(20) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user3_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    admins(
        admin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        location VARCHAR(20) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user4_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    employees(
        employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        location VARCHAR(20) NOT NULL,
        salary double,
        user_id INT NOT NULL,
        CONSTRAINT fk_user5_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    transports(
        transport_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        office_name VARCHAR(20) NOT NULL,
        first_name VARCHAR(20) NOT NULL,                                                               
        last_name VARCHAR(20) NOT NULL,
        location VARCHAR(20) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user6_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    transport_trucks(
        truck_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        transport_id INT NOT NULL,
        truck_number VARCHAR(15) NOT NULL UNIQUE,
        CONSTRAINT fk_transport_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    merchants(
        merchant_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        company_name VARCHAR(30),
        location VARCHAR(20) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user7_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    labour_rates(
        container_type ENUM('crates', 'bags', 'leno_bags') PRIMARY KEY,
        rate double NOT NULL
    );
CREATE TABLE
    farmer_purchases (
        purchase_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        farmer_id INT NOT NULL,
        variety VARCHAR(20) NOT NULL,
        container_type ENUM('crates','bags','leno_bags'),
        quantity INT NOT NULL,
        total_weight DOUBLE NOT NULL,
        tare_weight DOUBLE NOT NULL,
        net_weight DOUBLE AS (total_weight - tare_weight),
        rate_per_kg DOUBLE NOT NULL,
        CONSTRAINT fk_farmer_id FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE,
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_container_type FOREIGN KEY (container_type) REFERENCES labour_rates(container_type)
    );
 CREATE TABLE
    farmer_purchases_billing(
        bill_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        purchase_id INT NOT NULL,
        labour_charges DOUBLE DEFAULT 0,
        total_amount DOUBLE DEFAULT 0,
        CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES farmer_purchases(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
    );
CREATE TABLE
    sells(
        sell_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        purchase_id INT NOT NULL,
        merchant_id INT,
        truck_id INT,
        net_weight DOUBLE NOT NULL,
        rate_per_kg DOUBLE NOT NULL DEFAULT 0,
        total_amount DOUBLE AS (net_weight * rate_per_kg),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase2_id FOREIGN KEY (purchase_id) REFERENCES farmer_purchases(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_merchant_id FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_truck_id FOREIGN KEY (truck_id) REFERENCES transport_trucks(truck_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    SELECT * FROM sells;
   CREATE TABLE
    sells_billing(
        bill_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sell_id INT NOT NULL,
        freight_charges DOUBLE DEFAULT 0,
        labour_charges DOUBLE NOT NULL DEFAULT 0,
        total_charges DOUBLE AS(
            freight_charges + labour_charges
        ),
        
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_sell_id FOREIGN KEY (sell_id) REFERENCES sells(sell_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

    CREATE TABLE freight_rates (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  from_destination VARCHAR(50) NOT NULL,
  to_destination VARCHAR(50) NOT NULL,
  kilometers INT NOT NULL,
  rate_per_km DOUBLE NOT NULL,
  bill_id INT NOT NULL,
  CONSTRAINT fk_bill_id FOREIGN KEY (bill_id) REFERENCES sells_billing(bill_id) ON UPDATE CASCADE ON DELETE CASCADE
);
 
 --query for calculating freight charges of one truck
SELECT sells.sell_id,sells.truck_id,sells_billing.freight_charges,sells.date 
from sells,sells_billing
WHERE sells.sell_id=sells_billing.sell_id and sells.truck_id=1;
CREATE TABLE
    transactions(
        transaction_id INT PRIMARY KEY AUTO_INCREMENT,
        from_acount_number VARCHAR(20),
        to_account_number VARCHAR(20),
        amount DOUBLE,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        from_account_id INT NOT NULL,
        to_account_id INT NOT NULL,
        CONSTRAINT fk_account2_id FOREIGN KEY (from_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_account3_id FOREIGN KEY (to_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    payments(
        payment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        payment_date DATETIME,
        payment_mode ENUM(
            'by cash',
            'by bank transaction'
        ),
        transection_id INT NOT NULL,
        bill_id INT NOT NULL,
        CONSTRAINT fk_bill_id_1 FOREIGN KEY (bill_id) REFERENCES farmer_purchases_billing(bill_id) ON UPDATE CASCADE ON DELETE CASCADE
    );


--for calculating labour_charges
CREATE PROCEDURE calculate_purchase_labour_charges(IN billId INT) BEGIN 
	DECLARE labourRate DOUBLE DEFAULT 0;
	DECLARE Quantity INT DEFAULT 0;
	DECLARE purchaseId INT ;
	SELECT purchase_id INTO purchaseId FROM farmer_purchases_billing WHERE bill_id = billId;
    SELECT rate INTO labourRate FROM labour_rates,farmer_purchases WHERE  farmer_purchases.purchase_id= purchaseId AND labour_rates.container_type=farmer_purchases.container_type;
    SELECT farmer_purchases.quantity INTO Quantity  FROM farmer_purchases WHERE farmer_purchases.purchase_id = purchaseId;
    UPDATE farmer_purchases_billing SET labour_charges = labourRate * Quantity WHERE bill_id = BillId;
END;
SELECT * FROM farmer_purchases_billing;
--for calculating total_amount
CREATE PROCEDURE calculate_purchase_total_amount(IN billId 
INT) BEGIN 
	DECLARE totalAmount DOUBLE ;
	DECLARE labourChrges DOUBLE DEFAULT 0;
	DECLARE purchaseId INT;
	SELECT
	    purchase_id INTO purchaseId
	FROM farmer_purchases_billing
	WHERE bill_id = billId;
    SELECT labour_charges INTO labourChrges FROM farmer_purchases_billing WHERE bill_id = billId;
	SELECT farmer_purchases.net_weight * farmer_purchases.rate_per_kg INTO totalAmount
	FROM farmer_purchases WHERE purchase_id = purchaseId;
	UPDATE
	    farmer_purchases_billing
	SET total_amount = totalAmount - labour_charges
	WHERE bill_id = billId;
END; 

-- DROP PROCEDURE calculate_purchase_total_amount;
--for calculating freight_charges
CREATE PROCEDURE calculate_freight_charges(IN bill_Id 
INT) BEGIN 
	DECLARE freightCharges DOUBLE;
    
	SELECT
	    freight_rates.kilometers * freight_rates.rate_per_km INTO freightCharges
	FROM freight_rates WHERE freight_rates.bill_id = bill_Id  ;
	UPDATE
	    sells_billing
	SET
	    freight_charges = freightCharges
	WHERE sells_billing.bill_id = bill_Id;
END; 

CREATE PROCEDURE calculate_labour_charges_of_sells(IN bill_Id 
INT) BEGIN 
UPDATE 
    sells_billing 
    INNER JOIN sells ON sells_billing.sell_id = sells.sell_id
    INNER JOIN farmer_purchases ON sells.purchase_id = farmer_purchases.purchase_id
    INNER JOIN labour_rates ON farmer_purchases.container_type = labour_rates.container_type 
SET 
    sells_billing.labour_charges = farmer_purchases.quantity * labour_rates.rate
WHERE 
    sells_billing.bill_id =bill_Id;
    END;


INSERT INTO labour_rates(container_type,rate)VALUES('crates',5);
INSERT INTO labour_rates(container_type,rate)VALUES('bags',6);
INSERT INTO labour_rates(container_type,rate)VALUES('leno_bags',4);
INSERT INTO users(contact_number, password)VALUES('9078678767', 'password');
INSERT INTO users(contact_number, password)VALUES('6567678765', 'password');
INSERT INTO users(contact_number, password)VALUES('9898765467', 'password');
INSERT INTO users(contact_number, password)VALUES('8987875655', 'password');
INSERT INTO users(contact_number, password)VALUES('8978987898', 'password');
INSERT INTO users(contact_number, password)VALUES('9898786778', 'password');
INSERT INTO users(contact_number, password)VALUES('9090989899', 'password');
INSERT INTO users(contact_number, password)VALUES('9009009090', 'password');
INSERT INTO users(contact_number, password)VALUES('9099090909', 'password');
INSERT INTO users(contact_number, password)VALUES('9912457567', 'password');
INSERT INTO users(contact_number, password)VALUES('9888787899', 'password');
INSERT INTO users(contact_number, password)VALUES('8777677778', 'password');
INSERT INTO users(contact_number, password)VALUES('7788877887', 'password');
INSERT INTO users(contact_number, password)VALUES('9888788887', 'password');
INSERT INTO users(contact_number, password)VALUES('9999888876', 'password');
INSERT INTO users(contact_number, password)VALUES('7888878868', 'password');
INSERT INTO users(contact_number, password)VALUES('7878787878', 'password');
INSERT INTO users(contact_number, password)VALUES('8787878787', 'password');
INSERT INTO users(contact_number, password)VALUES('5677667676', 'password');
INSERT INTO users(contact_number, password)VALUES('7878787867', 'password');
INSERT INTO roles(role_name)VALUES('admin');
INSERT INTO roles(role_name)VALUES('farmer');
INSERT INTO roles(role_name)VALUES('employee');
INSERT INTO roles(role_name)VALUES('transport');
INSERT INTO roles(role_name)VALUES('produce_merchant');
INSERT INTO user_roles(user_id,role_id)VALUES(1,1);
INSERT INTO user_roles(user_id,role_id)VALUES(2,2);
INSERT INTO user_roles(user_id,role_id)VALUES(3,3);
INSERT INTO user_roles(user_id,role_id)VALUES(4,4);
INSERT INTO user_roles(user_id,role_id)VALUES(5,5);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('123213232','asdfg852',1);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('453544565','dft6757f',2);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('786789865','uij7878b',3);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('656765675','wesw3434',4);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('345656776','dfdg4566',5);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('567656755','ghhyu789',6);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('566567757','fghj5656',7);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('456545644','5hhffh66',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('453454324','tt675g67',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('675778678','45656fgh',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('345456567','dfghg676',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('567678878','ere34564',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('567788978','rt564566',8);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('566753211','fghj5656',9);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('564312323','dfdg4566',10);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('456788900','ere34564',13);
INSERT into accounts(account_number,ifsc_code,user_id)VALUES('232121213','5ggg5gg6',20);
INSERT INTO farmers(first_name,last_name,location,user_id)VALUES ('Rohit','Gore','Peth',1);
INSERT INTO farmers(first_name,last_name,location,user_id)VALUES ('Akshay','Tanpure','Wada',2);
INSERT INTO admins(first_name,last_name,location,user_id)VALUES('Ashok','Bajare','Bhavadi',3);
INSERT INTO admins(first_name,last_name,location,user_id)VALUES('Ashok','Chakkar','Bhavadi',4);
INSERT INTO employees(first_name,last_name,location,salary,user_id)VALUES('Abhay','Navale','Bhavadi',15000,5);
INSERT INTO employees(first_name,last_name,location,salary,user_id)VALUES('Shubham','Teli','Kudalewadi',15000,6);
INSERT INTO employees(first_name,last_name,location,salary,user_id)VALUES('Sahil','Mankar','Pargaon',15000,7);
INSERT INTO transports(office_name,first_name,last_name,location,user_id)VALUES('OM Transports','Ashok','Chakkar','Karegaon',8);
INSERT INTO transports(office_name,first_name,last_name,location,user_id)VALUES('Waghule Transport','Sahil','Mankar','Bahirwadi',9);
INSERT INTO transports(office_name,first_name,last_name,location,user_id)VALUES('Urmila Transport','Shubham','Teli','Chas',10);
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(1, 'MH14RE3456');
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(2,'MH14RE1234');
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(3,'MH14RE2345');
INSERT INTO merchants(company_name,first_name,last_name,location,user_id)VALUES ('Zatka Company','Ramesh','Gawade','Manchar',14);
INSERT INTO merchants(company_name,first_name,last_name,location,user_id)VALUES ('HemantKumar Company','Hemant','Pokharkar','Manchar',15);
INSERT INTO merchants(company_name,first_name,last_name,location,user_id)VALUES ('Nighot Company','Anuj','Nighot','Manchar',16);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(1, 'Potato','bags', 50, 2500, 25, 30);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(1, 'Potato','bags', 50, 2500, 25, 30);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES( 2, 'Onion','bags', 500, 500, 50, 10);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(2,'Onion','bags',1000,50000,1000,12);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(2,'Lady Finger','crates',50,1000,100,20);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(2,'Garlic','bags',30,150,15,15);
INSERT INTO farmer_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(2,'Potato','leno_bags',20,200,20,10);

INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(1,1,1,200,15);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(2,2,2,400,20);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(3,2,1,4000,200);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(4,2,1,1000,20);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(5,2,1,150,20);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(6,2,1,200,12);
INSERT INTO sells(purchase_id,merchant_id,truck_id,net_weight,rate_per_kg)VALUES(7,2,1,200,20);


SELECT * FROM sells;
INSERT INTO farmer_purchases_billing(purchase_id)VALUES(1);
INSERT INTO sells_billing(sell_id)VALUES(4);
INSERT INTO sells_billing(sell_id)VALUES(5);
INSERT INTO sells_billing(sell_id)VALUES(6);
INSERT INTO sells_billing(sell_id)VALUES(7);
SELECT * FROM sells_billing;
CALL calculate_freight_charges(1);



INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',100,40,1);
INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',10,40,1);
INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',10,40,2);
INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',10,40,2);
INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',10,40,3);
INSERT INTO freight_rates(from_destination,to_destination,kilometers,rate_per_km,bill_id)VALUES('Bhavadi','Pune',10,40,3);


-- SELECT * FROM farmer_purchases;
-- SELECT * FROM sells_billing;
CALL calculate_purchase_labour_charges(1);
CALL calculate_purchase_total_amount(1);
SELECT * FROM farmer_purchases_billing;

-- CALL calculate_freight_charges(1);

-- -- CALL calculate_freight_charges(2);
-- CALL calculate_freight_charges(1);
-- CALL calculate_labour_charges_of_sells(1);
SELECT * FROM users;

SELECT * FROM farmer_purchases;
SELECT * FROM sells_billing;
-- CALL calculate_labour_charges_of_sells(1);
-- CALL calculate_labour_charges_of_sells(2);
-- CALL calculate_labour_charges_of_sells(1);

-- SELECT * FROM farmer_purchases;
-- SELECT * FROM farmer_purchases_billing;

-- SELECT * FROM farmer_purchases WHERE farmer_id=1;
-- SELECT * from farmers ;
-- SELECT * FROM sells WHERE truck_id=1;
-- SELECT * FROM farmers WHERE farmer_id=1;
-- SELECT * FROM transports ;

-- SELECT farmers.first_name,farmers.last_name,farmers.location,farmer_purchases.variety,farmer_purchases.quantity,farmer_purchases.total_weight,farmer_purchases.tare_weight,farmer_purchases.net_weight,farmer_purchases.`date`,transport_trucks.truck_number,sells.net_weight,sells.rate_per_kg,sells.total_amount FROM farmers
-- INNER JOIN farmer_purchases On farmers.farmer_id=farmer_purchases.farmer_id 
-- INNER JOIN sells on farmer_purchases.purchase_id=sells.purchase_id 
-- INNER JOIN transport_trucks ON sells.truck_id=transport_trucks.truck_id 
--  WHERE farmers.farmer_id=1;

--  SELECT * FROM users;
--  SELECT * FROM user_roles;
--  SELECT * FROM transports;
--  SELECT * FROM roles;
--  SELECT * FROM produce_merchants;
 
-- SELECT * FROM produce_merchants WHERE user_id=1;
