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
        CONSTRAINT fk_farmer_id FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
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
        salary double,
        credit_balance DOUBLE DEFAULT 0,
        debit_balance DOUBLE DEFAULT 0,
        balance DOUBLE AS (credit_balance - debit_balance)
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
        office_name VARCHAR(20) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        location VARCHAR(20) NOT NULL,
        credit_balance DOUBLE DEFAULT 0,
        debit_balance DOUBLE DEFAULT 0,
        balance DOUBLE AS (credit_balance - debit_balance)
    );
CREATE TABLE
    transport_trucks(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        transport_id INT NOT NULL,
        truck_number VARCHAR(15) NOT NULL UNIQUE,
        CONSTRAINT fk_transport3_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
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
        location VARCHAR(20) NOT NULL,
        credit_balance DOUBLE DEFAULT 0,
        debit_balance DOUBLE DEFAULT 0,
        balance DOUBLE AS (credit_balance - debit_balance)
    );
CREATE TABLE
    consignee_accounts(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        consignee_id INT NOT NULL,
        CONSTRAINT fk_account3_id FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_consignee2_id FOREIGN KEY (consignee_id) REFERENCES consignees(consignee_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    dealers(
        dealer_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name varchar(20) NOT NULL,
        last_name varchar(20) NOT NULL,
        company_name varchar(20),
        contact_number VARCHAR(15) NOT NULL,
        location VARCHAR(20) NOT NULL,
        credit_balance DOUBLE DEFAULT 0,
        debit_balance DOUBLE DEFAULT 0,
        balance DOUBLE AS (credit_balance - debit_balance)
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
    categories(
        category_id INT PRIMARY KEY AUTO_INCREMENT,
        category_title VARCHAR(20),
        description VARCHAR (100),
        imageUrl VARCHAR(50)
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
        date DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
        CONSTRAINT fk_farmers6_id FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
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
        freight_charges DOUBLE NOT NULL,
        Labour_charges DOUBLE DEFAULT 0,
        total_charges DOUBLE AS(freight_charges + labour_charges),
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase_id FOREIGN KEY (purchase_id) REFERENCES purchasedItems(purchase_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_consignee_id FOREIGN KEY (consignee_id) REFERENCES consignees(consignee_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_transport_id FOREIGN KEY (transport_id) REFERENCES transports(transport_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    farmer_bills(
        bill_id INT PRIMARY KEY AUTO_INCREMENT,
        farmer_id INT NOT NULL,
        bill_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        payment_mode ENUM("Cash", "Pending") NOT NULL,
        bill_total DOUBLE,
        CONSTRAINT fk_farmers3 FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id) ON UPDATE CASCADE ON DELETE CASCADE
    );
CREATE TABLE
    bill_products(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
        amount DOUBLE,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        from_account_id INT NOT NULL,
        to_account_id INT NOT NULL,
        CONSTRAINT fk_account8_id FOREIGN KEY (from_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_account7_id FOREIGN KEY (to_account_id) REFERENCES accounts(account_id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- SELECT sum(products.unit_price * bill_products.quantity) AS amount,bill_date FROM bill_products

--     INNER JOIN products ON products.product_id = bill_products.product_id

--     INNER JOIN farmer_bills ON farmer_bills.bill_id = bill_products.bill_id

--     INNER JOIN farmers ON farmers.farmer_id = farmer_bills.farmer_id

--      WHERE farmer_bills.bill_id=1;ORDER BY bill_date;

-- WHERE products.product_id= bill_products.product_id and  farmer_bills.bill_id=bill_products.bill_id and farmer_bills.farmer_id=farmers.farmer_id;

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
	UPDATE farmers
	SET
	    credit_balance = credit_balance + NEW.total_amount
	WHERE
	    farmer_id = NEW.farmer_id;
END; 
SELECT products.product_id,products.product_title,products.unit_price,bill_products.quantity,(  products.unit_price * bill_products.quantity  ) AS amount,bill_date FROM bill_products,products,farmer_bills,farmers
WHERE products.product_id= bill_products.product_id and  farmer_bills.bill_id=bill_products.bill_id and farmer_bills.farmer_id=farmers.farmer_id
and farmer_bills.farmer_id=1 ORDER BY bill_date ;   
SELECT
    farmers.first_name,
    products.product_id,
    products.product_title,
    products.unit_price,
    bill_products.quantity, (
        products.unit_price * bill_products.quantity
    ) AS amount,
    farmer_bills.bill_date
FROM bill_products
    INNER JOIN products ON products.product_id = bill_products.product_id
    INNER JOIN farmer_bills ON farmer_bills.bill_id = bill_products.bill_id
    INNER JOIN farmers ON farmers.farmer_id = farmer_bills.farmer_id
WHERE farmer_bills.bill_id = 1;
CREATE PROCEDURE update_farmer_debit_balance(IN billId INT)
BEGIN
DECLARE totalAmount DOUBLE;
DECLARE debitBalance DOUBLE;
DECLARE farmerId INT;
DECLARE paymentMode ENUM("Cash","Pending");
START TRANSACTION;
SELECT sum(products.unit_price * bill_products.quantity) INTO totalAmount FROM bill_products
    INNER JOIN products ON products.product_id = bill_products.product_id
    INNER JOIN farmer_bills ON farmer_bills.bill_id = bill_products.bill_id
    INNER JOIN farmers ON farmers.farmer_id = farmer_bills.farmer_id
    WHERE farmer_bills.bill_id=billId;
    SELECT farmer_id INTO farmerId FROM farmer_bills WHERE bill_id=billId;
    SELECT debit_balance INTO debitBalance FROM farmers WHERE farmer_id=farmerId;
    UPDATE farmer_bills SET bill_total=totalAmount WHERE bill_id=billId;
    SELECT payment_mode INTO paymentMode FROM farmer_bills WHERE bill_id=billId;
    IF paymentMode='Pending' THEN
    UPDATE farmers SET debit_balance=debitBalance+totalAmount  WHERE farmer_id=farmerId;
    END IF;
COMMIT; 
END;
CALL update_farmer_debit_balance(3);
INSERT INTO users(contact_number, password)VALUES('9078678767', 'password');
INSERT INTO users(contact_number, password)VALUES('6567678765', 'password');
INSERT INTO users(contact_number, password)VALUES('9898765467', 'password');
INSERT INTO users(contact_number, password)VALUES('8987875655', 'password');
INSERT INTO users(contact_number, password)VALUES('8978987898', 'password');
INSERT INTO roles(role_name)VALUES('admin');
INSERT INTO roles(role_name)VALUES('farmer');
INSERT INTO roles(role_name)VALUES('employee');
INSERT INTO roles(role_name)VALUES('transport');
INSERT INTO roles(role_name)VALUES('consignee');
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
INSERT INTO farmers(first_name,last_name,contact_number,password,location)VALUES ('Rohit','Gore','7448022756','password','Peth');
INSERT INTO farmers(first_name,last_name,contact_number,password,location)VALUES ('Akshay','Tanpure','7448021234','password','Wada');
INSERT INTO farmers(first_name,last_name,contact_number,password,location)VALUES ('Akash','Ajab','7448012345','password','Walati');
INSERT INTO farmers(first_name,last_name,contact_number,password,location)VALUES ('Ajay','Kale','5667899876','password','Peth');
INSERT INTO farmers(first_name,last_name,contact_number,password,location)VALUES ('Vishal','Gunjal','9876467765','password','Thugaon');
INSERT INTO farmer_accounts(account_id,farmer_id)VALUES(1,1);
INSERT INTO farmer_accounts(account_id,farmer_id)VALUES(2,2);
INSERT INTO farmer_accounts(account_id,farmer_id)VALUES(3,3);
INSERT INTO farmer_accounts(account_id,farmer_id)VALUES(4,4);
INSERT INTO farmer_accounts(account_id,farmer_id)VALUES(5,5);
INSERT INTO admins(first_name,last_name,contact_number,password,location)VALUES('Ashok','Bajare','9090890979','password','Bhavadi');
INSERT INTO admins(first_name,last_name,contact_number,password,location)VALUES('Ashok','Chakkar','8789878987','password','Bhavadi');
INSERT INTO admin_accounts(account_id,admin_id)VALUES(6,1);
INSERT INTO admin_accounts(account_id,admin_id)VALUES(7,2);
INSERT INTO employees(first_name,last_name,contact_number,location,password,salary)VALUES('Abhay','Navale','9075966080','Bhavadi','password',15000);
INSERT INTO employees(first_name,last_name,contact_number,location,password,salary)VALUES('Shubham','Teli','7448032740','Kudalewadi','password',15000);
INSERT INTO employees(first_name,last_name,contact_number,location,password,salary)VALUES('Sahil','Mankar','9090889090','Pargaon','password',15000);
INSERT INTO employee_accounts(account_id,employee_id)VALUES(8,1);
INSERT INTO employee_accounts(account_id,employee_id)VALUES(9,2);
INSERT INTO employee_accounts(account_id,employee_id)VALUES(10,3);
INSERT INTO transports(office_name,first_name,last_name,contact_number,location)VALUES('OM Transports','Ashok','Chakkar','8989878723','Karegaon');
INSERT INTO transports(office_name,first_name,last_name,contact_number,location)VALUES('Waghule Transport','Sahil','Mankar','8989873454','Bahirwadi');
INSERT INTO transports(office_name,first_name,last_name,contact_number,location)VALUES('Urmila Transport','Shubham','Teli','8123473454','Chas');
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(1, 'MH14RE3456');
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(2,'MH14RE1234');
INSERT INTO transport_trucks(transport_id,truck_number)VALUES(3,'MH14RE2345');
INSERT INTO transport_accounts(account_id,transport_id)VALUES(11,1);
INSERT INTO transport_accounts(account_id,transport_id)VALUES(12,2);
INSERT INTO transport_accounts(account_id,transport_id)VALUES(13,3);
INSERT INTO consignees(company_name,first_name,last_name,contact_number,location)VALUES ('Zatka Company','Ramesh','Gawade','9090909012','Manchar');
INSERT INTO consignees(company_name,first_name,last_name,contact_number,location)VALUES ('HemantKumar Company','Hemant','Pokharkar','9878987797','Manchar');
INSERT INTO consignees(company_name,first_name,last_name,contact_number,location)VALUES ('Nighot Company','Anuj','Nighot','9878987897','Manchar');
INSERT INTO consignee_accounts(account_id,consignee_id)VALUES(14,1);
INSERT INTO consignee_accounts(account_id,consignee_id)VALUES(15,2);
INSERT INTO consignee_accounts(account_id,consignee_id)VALUES(16,3);
INSERT INTO dealers(first_name,last_name,company_name,contact_number,location)VALUES('Raju','Rastogi','BAYER','8954123523','Mumbai');
INSERT INTO dealers(first_name,last_name,company_name,contact_number,location)VALUES('Farhan','Khan','Cipla','8957893564','Kolkata');
INSERT INTO dealer_accounts(account_id,dealer_id)VALUES(17,1);
INSERT INTO dealer_accounts(account_id,dealer_id)VALUES(18,2);
INSERT INTO categories(category_title,description,imageUrl)VALUES('Instecticides','Deadly Instecticides','/images/instecticide.jpg');
INSERT INTO categories(category_title,description,imageUrl)VALUES('Pesticides','Pest Killers','/images/pesticide.jpg');
INSERT INTO categories(category_title,description,imageUrl)VALUES('Fertilizers','Good Fertilizers','/images/fertilizer.jpg');
INSERT INTO categories(category_title,description,imageUrl)VALUES('Growth Promoter','Growth Promoter','/images/growthpromoter.jpg');
INSERT INTO products(product_title,description,stock_available,unit_price,imageUrl,category_id,dealer_id)VALUES('Karate','inseticide',200,400,'/images/karate.jpg',1,1);
INSERT INTO products(product_title,description,stock_available,unit_price,imageUrl,category_id,dealer_id)VALUES('Solomon','pesticide',150,750,'/images/solomon.jpg',2,1);
INSERT INTO products(product_title,description,stock_available,unit_price,imageUrl,category_id,dealer_id)VALUES('15:33:33','Fertilizer',70,1450,'/images/15:33:33.jpg',3,2);
INSERT INTO products(product_title,description,stock_available,unit_price,imageUrl,category_id,dealer_id)VALUES('SEQUL','Growth Promoter',321,450,'/images/sequl.jpg',4,2);
INSERT INTO dealer_orders(dealer_id,total)VALUES(1,100000);
INSERT INTO dealer_orders(dealer_id,total)VALUES(2,200000);
INSERT INTO dealer_order_details(order_id,product_id,quantity,discount)VALUES(1,1,2000,2000);
INSERT INTO dealer_order_details(order_id,product_id,quantity,discount)VALUES(2,2,3000,3000);
INSERT INTO purchasedItems(farmer_id,variety,bags,total_weight,tare_weight,rate_per_kg,labour_charges)VALUES(1, 'Potato', 50, 2500, 25, 30, 400);
INSERT INTO purchasedItems(farmer_id,variety,bags,total_weight,tare_weight,rate_per_kg,labour_charges)VALUES( 2, 'Onion', 500, 500, 2, 10, 2000);
INSERT INTO purchasedItems(farmer_id,variety,bags,total_weight,tare_weight,rate_per_kg,labour_charges)VALUES(3,'Onion',1000,50000,1000,12,4000);
INSERT INTO soldItems(purchase_id,consignee_id,transport_id,net_weight,rate_per_kg,freight_charges,labour_charges)VALUES(1,1,1,1000,20,20000,2000);
INSERT INTO soldItems(purchase_id,consignee_id,transport_id,net_weight,rate_per_kg,freight_charges,labour_charges)VALUES(1,1,1,2000,40,30000,3000);
INSERT INTO farmer_bills(farmer_id,payment_mode) VALUES(1,"Pending");
INSERT INTO farmer_bills(farmer_id,payment_mode) VALUES(2,"Pending");
INSERT INTO farmer_bills(farmer_id,payment_mode) VALUES(3,"Cash");
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(1, 1, 2);
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(1, 3, 1);
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(1, 4, 4);
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(2, 4, 4);
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(3, 1, 10);
INSERT INTO bill_products (bill_id, product_id, quantity)VALUES(3, 2, 10);
SELECT * FROM consignees;
SELECT date FROM purchasedItems;
SELECT * FROM soldItems;
SELECT * FROM transports;
SELECT * FROM farmers;
SELECT * FROM employees;
SELECT * FROM soldItems;
SELECT * FROM accounts;
SELECT * FROM users;
SELECT * FROM solditems;
select * from farmer_bills;
SELECT * FROM bill_products;
