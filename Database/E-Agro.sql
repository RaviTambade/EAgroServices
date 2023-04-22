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
    farmers(
        farmer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        contact_number VARCHAR(15) NOT NULL UNIQUE,
        password VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL,
        credit_balance DOUBLE DEFAULT 0,
        debit_balance DOUBLE DEFAULT 0,
        balance DOUBLE AS (credit_balance - debit_balance)
    );
CREATE TABLE
    farmer_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        farmer_id INT NOT NULL,
        CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_farmer2_id FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    admins(
        admin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        contact_number VARCHAR(15) NOT NULL UNIQUE,
        password VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL
    );
CREATE TABLE
    admin_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        admin_id INT NOT NULL,
        CONSTRAINT fk_account4_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    employees(
        employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        contact_number VARCHAR(15) NOT NULL UNIQUE,
        password VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL,
        salary double
    );
CREATE TABLE
    employee_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        employee_id INT NOT NULL,
        CONSTRAINT fk_account5_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    transports(
        transport_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        truck_number VARCHAR(15) NOT NULL UNIQUE,
        office_name VARCHAR(20) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        location VARCHAR(20) NOT NULL
    );
CREATE TABLE
    transport_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        transport_id INT NOT NULL,
        CONSTRAINT fk_account2_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_transport2_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    consignees(
        consignee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        company_name VARCHAR(30),
        contact_number VARCHAR(25) NOT NULL,
        location VARCHAR(20) NOT NULL
        );
CREATE TABLE
    consignee_accounts(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        account_id INT NOT NULL,
        consignee_id INT NOT NULL,
        CONSTRAINT fk_account3_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_consignee2_id FOREIGN KEY (consignee_id) REFERENCES consignees(consignee_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    categories(
        category_id INT PRIMARY KEY AUTO_INCREMENT,
        category_title VARCHAR(20),
        description VARCHAR (100),
        imageUrl VARCHAR(50)
    );

CREATE TABLE
    dealers(
        dealer_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name varchar(20)  NOT NULL,
        last_name varchar(20)  NOT NULL,
        company_name varchar(20),
        contact_number VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL
        );
CREATE TABLE
    dealer_accounts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,
        dealer_id INT NOT NULL,
        CONSTRAINT fk_account6_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_dealer_id FOREIGN KEY (dealer_id) REFERENCES dealers(dealer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    products (
        product_id INT PRIMARY KEY AUTO_INCREMENT,
        product_title VARCHAR(20) NOT NULL,
        description VARCHAR(50),
        stock_available INT NOT NULL,
        unit_price DOUBLE NOT NULL,
        imageUrl VARCHAR(40),
        category_id INT NOT NULL,
        CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE,
        dealer_id INT NOT NULL,
        CONSTRAINT fk_dealer2_id FOREIGN KEY(dealer_id) REFERENCES dealers(dealer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    dealer_orders(
        order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        dealer_id INT NOT NULL,
        CONSTRAINT fk_dealer3_id FOREIGN KEY (dealer_id) REFERENCES dealers(dealer_id) ON UPDATE CASCADE ON DELETE CASCADE,
        total double
    );
CREATE TABLE
    dealer_order_details(
        order_details_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES dealer_orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
        product_id INT NOT NULL,
        CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
        quantity INT NOT NULL,
        discount DOUBLE DEFAULT 0
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
        total_amount DOUBLE AS ( (net_weight * rate_per_kg) - labour_charges
        ),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_farmers FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    soldItems(
        sell_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        purchase_id INT NOT NULL,
        consignee_id INT,
        transport_id INT,
        net_weight DOUBLE NOT NULL,
        rate_per_kg DOUBLE NOT NULL DEFAULT 0,
        total_amount DOUBLE AS (net_weight * rate_per_kg),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES purchasedItems(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_consignee_id FOREIGN KEY (consignee_id) REFERENCES consignees(consignee_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_transport_id FOREIGN KEY (transport_id ) REFERENCES transports(transport_id ) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    farmer_bills(
        bill_id INT PRIMARY KEY AUTO_INCREMENT,
        farmer_id INT NOT NULL,
        bill_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        payment_mode ENUM("Cash","Pending") NOT NULL,
        bill_total DOUBLE,
        CONSTRAINT fk_farmers3 FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    bill_products(
        bill_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        CONSTRAINT fk_bill_id FOREIGN KEY (bill_id) REFERENCES farmer_bills(bill_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_product_id3 FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
     transactions(
        transaction_id INT PRIMARY KEY AUTO_INCREMENT,
        from_acount_number VARCHAR(20),
        to_account_number VARCHAR(20),
        amount DOUBLE ,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        from_account_id INT NOT NULL ,
        to_account_id INT NOT NULL, 
CONSTRAINT fk_account8_id FOREIGN KEY (from_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
 CONSTRAINT fk_account7_id FOREIGN KEY (to_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE);
CREATE TRIGGER SELL_INSERT AFTER INSERT ON PURCHASEDITEMS 
FOR EACH ROW BEGIN 
	INSERT INTO
	    soldItems(purchase_id, net_weight)
	VALUES (
	        NEW.purchase_id,
	        NEW.net_weight
    );
END; 

CREATE TRIGGER ADD_USER AFTER INSERT ON FARMERS FOR 
EACH ROW BEGIN 
	INSERT INTO
	    users (contact_number, password)
	VALUES (
	        NEW.contact_number,
	        NEW.password
	    );
END; 

CREATE TRIGGER DEL_USER AFTER DELETE ON FARMERS FOR 
EACH ROW BEGIN 
	DELETE FROM users WHERE contact_number = OLD.contact_number;
END; 

CREATE TRIGGER CREDIT_BALANCE AFTER INSERT ON PURCHASEDITEMS 
FOR EACH ROW BEGIN 
