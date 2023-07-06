
INSERT INTO users(peopleid)VALUES(1);   
INSERT INTO users(peopleid)VALUES(2);   
INSERT INTO users(peopleid)VALUES(3);   
INSERT INTO users(peopleid)VALUES(4);   
INSERT INTO users(peopleid)VALUES(5);   
INSERT INTO roles(name)VALUES('owner');
INSERT INTO roles(name)VALUES('farmer');
INSERT INTO roles(name)VALUES('inspector');
INSERT INTO roles(name)VALUES('manager');
INSERT INTO roles(name)VALUES('transporter');
INSERT INTO roles(name)VALUES('merchant');
INSERT INTO userroles(userid,roleid)VALUES(1,1);
INSERT INTO userroles(userid,roleid)VALUES(2,2);
INSERT INTO userroles(userid,roleid)VALUES(3,3);
INSERT INTO userroles(userid,roleid)VALUES(4,4);
INSERT INTO userroles(userid,roleid)VALUES(5,5);

INSERT INTO transporters VALUES(DEFAULT,"OM transport","6788997867","GH567675HI56","9078787678","OM@gmail.com",4);
INSERT INTO transporters VALUES(DEFAULT,"Shubham transport","1230989098","UJ7898988TY5","8789009090","Shubham@gmail.com",4);
INSERT INTO vehicles VALUES(DEFAULT,1,"jito","MH142022");
INSERT INTO vehicles VALUES(DEFAULT,1,"pickup","MH142222");
INSERT INTO vehicles VALUES(DEFAULT,2,"tata1109","MH142322");
INSERT INTO vehicles VALUES(DEFAULT,2,"mahindra1109","MH142422");
INSERT INTO crops(title,imageurl,rate)VALUES('Potato','/assets/images/potato.jpeg',32);
INSERT INTO crops(title,imageurl,rate)VALUES('Tomato','/assets/images/tomato.jpeg',12);
INSERT INTO crops(title,imageurl,rate)VALUES('Cabbage','/assets/images/cabbage.jpeg',21);
INSERT INTO crops(title,imageurl,rate)VALUES('Onion','/assets/images/onion.jpg',22);
INSERT INTO crops(title,imageurl,rate)VALUES('Bitroot','/assets/images/beetroot.jpeg',30);
INSERT INTO crops(title,imageurl,rate)VALUES('Beans','/assets/images/beans.jpeg',29);
INSERT INTO crops(title,imageurl,rate)VALUES('Brinjal','/assets/images/Brinjal.jpeg',29);
INSERT INTO crops(title,imageurl,rate)VALUES('wheat','/assets/images/wheat.jpeg',29);

INSERT INTO collectioncenters VALUES(DEFAULT,"OM Agro","7878909090","GH567675HI56","9032123212","OMAgro@gmail.com",3,4);
INSERT INTO collectioncenters VALUES(DEFAULT,"Sahyadri Agro","9011112323","GH567675HI56","9876567656","SahydriAgro@gmail.com",3,4);
INSERT INTO collectioncenters VALUES(DEFAULT,"Zataka Agro","53333434345","GH567675HI56","9087878990","Zatakaagro@gmail.com",3,4);

INSERT INTO collections (farmerid, cropid, containertype, quantity, totalweight, collectiondate) VALUES
(2, 2, 'bags', 40,  200, '2022-01-20 13:30:00'),
(2, 1, 'crates', 50,  250, '2022-01-03 10:00:00'),
(2, 3, 'lenobags', 120,  600, '2022-02-02 09:45:00'),
(2, 4, 'crates', 75,  375,  '2022-02-07 14:00:00');

INSERT INTO collectioninspection(collectionid,grade,weight,inspectorid) VALUES
(1,'A',180,3),
(2,'B',225,3),
(3,'C',540,3),
(4,'D',330,3);

INSERT INTO transporters(companyname,accountnumber,ifsccode,contactnumber,emailaddress,managerid) VALUES 
-- ("OM Transports",'34912350123',5);
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3456',1,'/assets/images/truck.jpg');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3455',2,'/assets/images/truck1.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3465',3,'/assets/images/truck2.webp');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3476',4,'/assets/images/truck3.jpeg');

INSERT INTO shipments(vehicleid,merchantid,kilometer,shipmentdate) VALUES

(1,5,55,'2022-01-20 13:30:00'),

(2,5,105,'2022-01-20 13:30:00');

