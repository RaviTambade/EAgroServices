-- Active: 1677341008727@@127.0.0.1@3306@eagroservicesdb
USE eagroservicesdb;


CREATE TABLE
  users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contact_number BIGINT NOT NULL UNIQUE,
    password varchar(15) NOT NULL,
    role varchar(15) NOT NULL
  );


CREATE TABLE
  farmers(
    farmer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    farmer_name VARCHAR(30) NOT NULL,
    contact_number BIGINT NOT NULL UNIQUE,
    password VARCHAR(15) NOT NULL,
    location VARCHAR(20) NOT NULL,
    account_number VARCHAR(25),
    ifsc_code VARCHAR(25),
    credit_balance DOUBLE DEFAULT 0,
    debit_balance DOUBLE DEFAULT 0,
    balance DOUBLE AS (credit_balance - debit_balance)
  );


CREATE TABLE
  transports(
    truck_number VARCHAR(15) NOT NULL UNIQUE PRIMARY KEY,
    office_name VARCHAR(20) NOT NULL,
    owner_name VARCHAR(20) NOT NULL,
    contact_number BIGINT NOT NULL,
    account_number VARCHAR(25),
    ifsc_code VARCHAR(25),
    location VARCHAR(20) NOT NULL
  );


CREATE TABLE
  consignees(
    consignee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    consignee_name VARCHAR(20) NOT NULL,
    contact_number BIGINT NOT NULL,
    location VARCHAR(20) NOT NULL,
    account_number VARCHAR(25),
    ifsc_code VARCHAR(25)
  );


CREATE TABLE
  purchasedItems (
    purchase_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    farmer_id INT NOT NULL,
    variety VARCHAR(20) NOT NULL,
    bags INT NOT NULL,
    total_weight DOUBLE NOT NULL,
    tare_weight DOUBLE NOT NULL,
    net_weight DOUBLE AS (total_weight - tare_weight),
    rate_per_kg DOUBLE NOT NULL,
    labour_charges DOUBLE DEFAULT 0,
    total_amount DOUBLE AS ((net_weight * rate_per_kg) - labour_charges),
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_farmers FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
  );


CREATE TABLE
  soldItems(
    sell_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    consignee_id INT,
    truck_number VARCHAR(15),
    net_weight DOUBLE NOT NULL,
    rate_per_kg DOUBLE,
    total_amount DOUBLE AS (net_weight * rate_per_kg),
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES purchasedItems(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_consignee_id FOREIGN KEY (consignee_id) REFERENCES consignees(consignee_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_truck_number FOREIGN KEY (truck_number) REFERENCES transports(truck_number) ON UPDATE CASCADE ON DELETE CASCADE
  );


CREATE TABLE
  farmerPurchasesBilling(
    bill_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    farmer_id INT NOT NULL,
    item1 VARCHAR(20),
    quantity1 INT DEFAULT 0,
    rate1 DOUBLE DEFAULT 0,
    amount1 DOUBLE AS (quantity1 * rate1),
    item2 VARCHAR(20),
    quantity2 INT DEFAULT 0,
    rate2 DOUBLE DEFAULT 0,
    amount2 DOUBLE AS (quantity2 * rate2),
    item3 VARCHAR(20),
    quantity3 INT DEFAULT 0,
    rate3 DOUBLE DEFAULT 0,
    amount3 DOUBLE AS (quantity3 * rate3),
    item4 VARCHAR(20),
    quantity4 INT DEFAULT 0,
    rate4 DOUBLE DEFAULT 0,
    amount4 DOUBLE AS (quantity4 * rate4),
    item5 VARCHAR(20),
    quantity5 INT DEFAULT 0,
    rate5 DOUBLE DEFAULT 0,
    amount5 DOUBLE AS (quantity5 * rate5),
    total_amount DOUBLE AS (
      (amount1) + (amount2) + (amount3) + (amount4) + (amount5)
    ),
    CONSTRAINT fk_farmers1 FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
  );


CREATE TRIGGER sell_insert AFTER INSERT ON purchasedItems FOR EACH ROW BEGIN
INSERT INTO
  soldItems(purchase_id, net_weight)
VALUES
  (NEW.purchase_id, NEW.net_weight);


END;


CREATE TRIGGER add_user AFTER INSERT ON farmers FOR EACH ROW BEGIN
INSERT INTO
  users (contact_number, password, role)
VALUES
  (NEW.contact_number, NEW.password, 'farmer');


END;


CREATE TRIGGER del_user AFTER DELETE ON farmers FOR EACH ROW BEGIN
DELETE FROM
  users
WHERE
  contact_number = OLD.contact_number;


END;


CREATE TRIGGER credit_balance AFTER INSERT ON purchasedItems FOR EACH ROW BEGIN
UPDATE
  farmers
SET
  credit_balance = credit_balance + NEW.total_amount
WHERE
  farmer_id = NEW.farmer_id;


END;


CREATE TRIGGER debit_balance AFTER INSERT ON farmerPurchasesBilling FOR EACH ROW BEGIN
UPDATE
  farmers
SET
  debit_balance = debit_balance + NEW.total_amount
WHERE
  farmer_id = NEW.farmer_id;


END;


INSERT INTO
  users(contact_number, password, role)
VALUES
  (9075966080, 'password', 'Admin');


INSERT INTO
  farmers(farmer_name, contact_number, password, location)
VALUES
  (
    'Rohit Gore',
    7448022756,
    'password',
    'Peth'
  ),
  (
    'Akshay Tanpure',
    8530728512,
    'password',
    'Wada'
  ),
  ('Akash Ajab', 9373306756, 'password', 'Valati');


INSERT INTO
  transports
VALUES
  (
    'MH14RE1234',
    'OM transports',
    'Ashok Chakkar',
    8989878723,
    '2345676545',
    'BP3456N4567',
    'Karegaon'
  );


INSERT INTO
  consignees(consignee_name, contact_number, location,account_number,ifsc_code)
VALUES
  ('Zatka Company', 9090909012, 'Manchar', '2345676545',  'BP3456N4567');


INSERT INTO
  purchasedItems(
    farmer_id,
    variety,
    bags,
    total_weight,
    tare_weight,
    rate_per_kg,
    labour_charges
  )
VALUES
  (1, 'Potato', 50, 2500, 25, 30, 400), (2, 'Onion', 500, 500, 2, 10,2000),(3, 'Onion',1000,50000, 1000, 12, 4000);


UPDATE
  soldItems
set
  consignee_id = 1,
  truck_number = 'MH14RE1234',
  rate_per_kg = 27.40
WHERE
  purchase_id = 1;


INSERT INTO
  farmerPurchasesBilling(farmer_id, item1, quantity1, rate1)
VALUES
  (1, 'Oberon', 3, 150),(2,'Topper 77',5,110),(3,'M-45',2,180);

  SELECT * FROM farmers;

              UPDATE farmers SET farmer_name='shubham', password=123  WHERE farmer_id=1;
