-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
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
        ifsc_code VARCHAR(20)
    );
CREATE TABLE
    user_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_user2_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
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
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        transport_id INT NOT NULL,
        truck_number VARCHAR(15) NOT NULL UNIQUE,
        CONSTRAINT fk_transport_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    produce_merchants(
        merchant_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        company_name VARCHAR(30),
        location VARCHAR(20) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user7_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    farmers_purchases (
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
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
    );
CREATE TABLE labour_rates(container_type ENUM('crates','bags','leno_bags') PRIMARY KEY,rate double NOT NULL);
INSERT INTO labour_rates(container_type,rate)VALUES('crates',5);
INSERT INTO labour_rates(container_type,rate)VALUES('bags',6);
INSERT INTO labour_rates(container_type,rate)VALUES('leno_bags',4);

-- CREATE TABLE
--     purchase_item_billing(
--         bill_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--         purchase_id INT NOT NULL,
--         labour_charges DOUBLE AS (
--         SELECT labour_charges.rate * farmers_purchases.quantity
--         FROM farmers_purchases 
--         JOIN labour_rates ON farmers_purchases.container_type =labour_charges.container_type
--         WHERE farmers_purchases.purchase_id = purchase_id
--   ),
--                 CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES farmers_purchases(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
--                 date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
--             );
 CREATE TABLE
    purchase_item_billing(
        bill_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        purchase_id INT NOT NULL,
        labour_charges DOUBLE DEFAULT 0,
        total_amount DOUBLE NOT NULL,
        CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES farmers_purchases(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
    );
    
CREATE TRIGGER calculate_labour_charges
AFTER INSERT ON farmers_purchases
FOR EACH ROW
BEGIN
    DECLARE container_type VARCHAR(20);
    DECLARE rate DOUBLE;
    DECLARE quantity INT;
   -- DECLARE labourCharges DOUBLE;
    IF (NEW.container_type = 'crates') THEN
        SELECT rate INTO rate FROM labour_rates WHERE container_type = 'crates';
    ELSEIF (NEW.container_type = 'bags') THEN
        SELECT rate INTO rate FROM labour_rates WHERE container_type = 'bags';
    ELSEIF (NEW.container_type = 'leno_bags') THEN
        SELECT rate INTO rate FROM labour_rates WHERE container_type = 'leno_bags';
    END IF;
    SET labourCharges = rate * NEW.quantity;
    UPDATE purchase_item_billing SET labour_charges=labourCharges WHERE purchase_id = purchase_id;
    END;

-- CREATE PROCEDURE calculate_labour_charges()
-- BEGIN
-- DECLARE noMoreRow INT DEFAULT 0; 
-- DECLARE container VARCHAR(20);
-- DECLARE rate DOUBLE;
-- DECLARE quantity INT;
-- DECLARE purchaseId INT;
-- DECLARE labour_charge_cursor CURSOR FOR SELECT container_type,quantity,purchase_id FROM farmers_purchases;
-- DECLARE CONTINUE HANDLER FOR NOT FOUND SET noMoreRow = 1;
-- OPEN labour_charge_cursor;
-- FETCH labour_charge_cursor INTO container,quantity,purchaseId;
-- WHILE noMoreRow=1 DO
-- IF (NEW.container_type = 'crates') THEN
--         SELECT rate INTO rate FROM labour_rates WHERE container_type = 'crates';
--     ELSEIF (NEW.container_type = 'bags') THEN
--         SELECT rate INTO rate FROM labour_rates WHERE container_type = 'bags';
--     ELSEIF (NEW.container_type = 'leno_bags') THEN
--         SELECT rate INTO rate FROM labour_rates WHERE container_type = 'leno_bags';
--     END IF;
--     UPDATE purchase_item_billing SET labour_charges=rate * quantity WHERE purchase_id=purchase_id;
--     END WHILE;
--     CLOSE labour_charge_cursor;
--     END;
-- CALL calculate_labour_charges();

CREATE TABLE
    farmer_sells(
        sell_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        purchase_id INT NOT NULL,
        merchant_id INT,
        transport_id INT,
        net_weight DOUBLE NOT NULL,
        rate_per_kg DOUBLE NOT NULL DEFAULT 0,
        total_amount DOUBLE AS (net_weight * rate_per_kg),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase2_id FOREIGN KEY (purchase_id) REFERENCES farmers_purchases(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_merchant_id FOREIGN KEY (merchant_id) REFERENCES produce_merchants(merchant_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_transport2_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
   CREATE TABLE
    farmers_sell_billing(
        bill_id NOT NULL PRIMARY KEY AUTO_INCREMENT,
        NOT NULL PRIMARY KEY AUTO_INCREMENT,
        freight_charges DOUBLE NOT NULL,
        Labour_charges DOUBLE NOT NULL DEFAULT 0,
        total_charges DOUBLE AS(
            freight_charges + labour_charges
        ),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_sell_id FOREIGN KEY (sell_id) REFERENCES farmer_sells(sell_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
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
-- CREATE TRIGGER ADD_USER AFTER INSERT ON ADMINS FOR 
-- EACH ROW BEGIN 
-- 	INSERT INTO
-- 	    users (contact_number, password)
-- 	VALUES (
-- 	        NEW.contact_number,
-- 	        NEW.password
-- 	    );
-- END; 
-- CREATE TRIGGER ADD_USER1 AFTER INSERT ON FARMERS FOR 
-- EACH ROW BEGIN 
-- 	INSERT INTO
-- 	    users (contact_number, password)
-- 	VALUES (
-- 	        NEW.contact_number,
-- 	        NEW.password
-- 	    );
-- END; 
-- CREATE TRIGGER ADD_USER2 AFTER INSERT ON EMPLOYEES FOR 
-- EACH ROW BEGIN 
-- 	INSERT INTO
-- 	    users (contact_number, password)
-- 	VALUES (
-- 	        NEW.contact_number,
-- 	        NEW.password
-- 	    );
-- END; 
-- CREATE TRIGGER ADD_USER3 AFTER INSERT ON CONSIGNEES FOR 
-- EACH ROW BEGIN 
-- 	INSERT INTO
-- 	    users (contact_number, password)
-- 	VALUES (
-- 	        NEW.contact_number,
-- 	        NEW.password
-- 	    );
-- END; 
-- CREATE TRIGGER ADD_USER4 AFTER INSERT ON TRANSPORTS FOR 
-- EACH ROW BEGIN 
-- 	INSERT INTO
-- 	    users (contact_number, password)
-- 	VALUES (
-- 	        NEW.contact_number,
-- 	        NEW.password
-- 	    );
-- END; 

-- CREATE TRIGGER DEL_USER AFTER DELETE ON FARMERS FOR 
-- EACH ROW BEGIN 
-- 	DELETE FROM users WHERE contact_number = OLD.contact_number;
-- END; 
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
INSERT into accounts(account_number,ifsc_code)VALUES('123213232','asdfg852');
INSERT into accounts(account_number,ifsc_code)VALUES('453544565','dft6757f');
INSERT into accounts(account_number,ifsc_code)VALUES('786789865','uij7878b');
INSERT into accounts(account_number,ifsc_code)VALUES('656765675','wesw3434');
INSERT into accounts(account_number,ifsc_code)VALUES('345656776','dfdg4566');
INSERT into accounts(account_number,ifsc_code)VALUES('567656755','ghhyu789');
INSERT into accounts(account_number,ifsc_code)VALUES('566567757','fghj5656');
INSERT into accounts(account_number,ifsc_code)VALUES('456545644','5hhffh66');
INSERT into accounts(account_number,ifsc_code)VALUES('453454324','tt675g67');
INSERT into accounts(account_number,ifsc_code)VALUES('675778678','45656fgh');
INSERT into accounts(account_number,ifsc_code)VALUES('345456567','dfghg676');
INSERT into accounts(account_number,ifsc_code)VALUES('567678878','ere34564');
INSERT into accounts(account_number,ifsc_code)VALUES('567788978','rt564566');
INSERT into accounts(account_number,ifsc_code)VALUES('566753211','fghj5656');
INSERT into accounts(account_number,ifsc_code)VALUES('564312323','dfdg4566');
INSERT into accounts(account_number,ifsc_code)VALUES('676789789','rt564566');
INSERT into accounts(account_number,ifsc_code)VALUES('455687657','ere34564');
INSERT into accounts(account_number,ifsc_code)VALUES('587654458','uij7878b');
INSERT into accounts(account_number,ifsc_code)VALUES('456753211','yui87996');
INSERT into accounts(account_number,ifsc_code)VALUES('456764322','45gh54yb');
INSERT into accounts(account_number,ifsc_code)VALUES('456712323','dfg3456g');
INSERT into accounts(account_number,ifsc_code)VALUES('899809099','dft6757f');
INSERT into accounts(account_number,ifsc_code)VALUES('678790098','sdf56654');
INSERT into accounts(account_number,ifsc_code)VALUES('456788900','ere34564');
INSERT into accounts(account_number,ifsc_code)VALUES('232121213','5ggg5gg6');
INSERT INTO farmers(first_name,last_name,location,user_id)VALUES ('Rohit','Gore','Peth',1);
INSERT INTO farmers(first_name,last_name,location,user_id)VALUES ('Akshay','Tanpure','Wada',2);
INSERT INTO user_accounts(account_id,user_id)VALUES(1,1);
INSERT INTO user_accounts(account_id,user_id)VALUES(2,2);
INSERT INTO user_accounts(account_id,user_id)VALUES(3,3);
INSERT INTO user_accounts(account_id,user_id)VALUES(4,4);
INSERT INTO user_accounts(account_id,user_id)VALUES(5,5);
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
INSERT INTO produce_merchants(company_name,first_name,last_name,location,user_id)VALUES ('Zatka Company','Ramesh','Gawade','Manchar',14);
INSERT INTO produce_merchants(company_name,first_name,last_name,location,user_id)VALUES ('HemantKumar Company','Hemant','Pokharkar','Manchar',15);
INSERT INTO produce_merchants(company_name,first_name,last_name,location,user_id)VALUES ('Nighot Company','Anuj','Nighot','Manchar',16);
INSERT INTO farmers_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(1, 'Potato','bags', 50, 2500, 25, 30);
INSERT INTO farmers_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES( 2, 'Onion','bags', 500, 500, 50, 10);
INSERT INTO farmers_purchases(farmer_id,variety,container_type,quantity,total_weight,tare_weight,rate_per_kg)VALUES(2,'Onion','bags',1000,50000,1000,12);
INSERT INTO soldItems(purchase_id,merchant_id,transport_id,net_weight,rate_per_kg,freight_charges)VALUES(1,1,1,1000,20,20000);
INSERT INTO soldItems(purchase_id,merchant_id,transport_id,net_weight,rate_per_kg,freight_charges)VALUES(1,1,1,2000,40,30000);
INSERT INTO purchase_item_billing(purchase_id)VALUES(1);
SELECT * FROM farmers_purchases;
SELECT * FROM transports;
SELECT * FROM farmers;
SELECT * FROM employees;
SELECT * FROM soldItems;
SELECT * FROM accounts;
SELECT * FROM users;
SELECT * FROM solditems;
SELECT * FROM labour_rates;
SELECT * FROM purchase_item_billing;



-- history of credited amounts of a farmer
-- SELECT farmers.first_name,farmers.last_name,SUM(farmer_history.credit_balance) AS total_credited_balance FROM farmers INNER JOIN farmer_history ON farmers.farmer_id=farmer_history.farmer_id WHERE farmer_history.farmer_id=1 GROUP BY farmer_history.farmer_id;
