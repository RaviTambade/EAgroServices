/* don't change sequence of any records*/
-- farmer
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(1,1,"person");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(2,2,"person");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(3,3,"person");
-- collection center

INSERT INTO customers(customerid,dependencyid,usertype) VALUES(4,1,"corporation");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(5,2,"corporation");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(6,3,"corporation");
-- transporter
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(7,4,"corporation");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(8,5,"corporation"); 
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(9,6,"corporation");
-- merchant
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(10,7,"corporation");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(11,7,"corporation");
INSERT INTO customers(customerid,dependencyid,usertype) VALUES(12,9,"corporation");

SELECT * FROM customers;
-- farmer
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('39025546612','savings','BARBO0000286',0,'2023-03-04',1);        
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('12656767876','savings','AXIS0000296',0,'2021-07-01',2);   
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('67675456546','savings','AXIS0000296',0,'2021-06-01',3); 

-- collection center
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('39025546601','business','MAHB0000286',0,'2023-03-01',4);
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('45656577687','business','AXIS0000296',0,'2022-03-11',5); 
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('46556565566','business','AXIS0000296',0,'2022-04-21',6); 
-- transporter

INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234233','business','AXIS0000296',0,'2021-11-11',7);
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234234','business','BARBO0000286',0,'2021-11-11',8);
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234235','business','AXIS0000296',0,'2021-11-11',9);

-- merchant
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234236','business','AXIS0000296',0,'2021-11-11',10);
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234237','business','BARBO0000286',0,'2021-11-11',11);
INSERT INTO accounts(acctnumber,accttype,ifsccode,balance,registereddate,customerid)VALUES('56423234238','business','AXIS0000296',0,'2021-11-11',12);


