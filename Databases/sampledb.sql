-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
    
    INSERT INTO roles(name)VALUES('collection manager');
    INSERT INTO roles(name)VALUES ('farmer');
    INSERT INTO roles(name)VALUES('inspector');
    INSERT INTO roles(name)VALUES('transporter');
    INSERT INTO roles(name)VALUES('merchant');
    INSERT INTO userroles(userid,roleid)VALUES(1,2);
    INSERT INTO userroles(userid,roleid)VALUES(2,2);
    INSERT INTO userroles(userid,roleid)VALUES(3,2);
    INSERT INTO userroles(userid,roleid)VALUES(4,1);
    INSERT INTO userroles(userid,roleid)VALUES(5,1);
    INSERT INTO userroles(userid,roleid)VALUES(6,1);
    INSERT INTO userroles(userid,roleid)VALUES(7,4);
    INSERT INTO userroles(userid,roleid)VALUES(8,4);
    INSERT INTO userroles(userid,roleid)VALUES(9,4);
    INSERT INTO userroles(userid,roleid)VALUES(10,5);
    INSERT INTO userroles(userid,roleid)VALUES(11,5);
    INSERT INTO userroles(userid,roleid)VALUES(12,5);
    INSERT INTO userroles(userid,roleid)VALUES(13,3);
    INSERT INTO userroles(userid,roleid)VALUES(14,3);



    INSERT INTO collectioncenters (corporateid,managerid) VALUES(1,4);
    INSERT INTO collectioncenters (corporateid,managerid) VALUES(2,5);
    INSERT INTO collectioncenters (corporateid,managerid) VALUES(3,6);

    INSERT INTO inspectors(userid,collectioncenterid) VALUES(13,1);
    INSERT INTO inspectors(userid,collectioncenterid) VALUES(14,2);

    INSERT INTO transporters (corporateid,managerid) VALUES(4,7);
    INSERT INTO transporters (corporateid,managerid) VALUES(5,8);
    INSERT INTO transporters (corporateid,managerid) VALUES(6,9);
    INSERT INTO merchants (corporateid,managerid) VALUES(7,10);
    INSERT INTO merchants (corporateid,managerid) VALUES(8,11);
    INSERT INTO merchants (corporateid,managerid) VALUES(9,12);



    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"jito","MH 14 AB 2022");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"pickup","MH 14 XY 2222");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"tata1109","MH 14 JD 2322");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"LP","MH 14 JD 2422");

    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(2,"jito","MH 14 NN 7567");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(2,"pickup","MH 14 NW 2352");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(2,"tata1109","MH 14 JD 9593");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(2,"LP","MH 14 JD 1122");

    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(3,"jito","MH 14 NN 9848");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(3,"pickup","MH 14 NW 2930");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(3,"tata1109","MH 14 JD 5678");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(3,"LP","MH 14 JD 2343");

    INSERT INTO ratecard (title,description,amount) VALUES ('bags','labour Charges per bag',10);
    INSERT INTO ratecard (title,description,amount) VALUES ('crates','labour Charges per crate',5);
    INSERT INTO ratecard (title,description,amount) VALUES ('polythene bags','labour Charges per bag',3);
    INSERT INTO ratecard (title,description,amount) VALUES ('jito','freight charge per km',12);
    INSERT INTO ratecard (title,description,amount) VALUES ('pickup','freight charge per km',15);
    INSERT INTO ratecard (title,description,amount) VALUES ('tata1109','freight charge per km',17);
    INSERT INTO ratecard (title,description,amount) VALUES ('LP','freight charge per km',20);
    INSERT INTO ratecard (title,description,amount) VALUES ('servicecharges','service charges per kg',1);
    INSERT INTO crops(title,imageurl,rate)VALUES('Potato','/assets/images/potato.jpeg',32);
    INSERT INTO crops(title,imageurl,rate)VALUES('Tomato','/assets/images/tomato.jpeg',12);
    INSERT INTO crops(title,imageurl,rate)VALUES('Cabbage','/assets/images/cabbage.jpeg',21);
    INSERT INTO crops(title,imageurl,rate)VALUES('Onion','/assets/images/onion.jpg',22);
    INSERT INTO crops(title,imageurl,rate)VALUES('Bitroot','/assets/images/beetroot.jpeg',30);
    INSERT INTO crops(title,imageurl,rate)VALUES('Beans','/assets/images/beans.jpeg',29);
    INSERT INTO crops(title,imageurl,rate)VALUES('Brinjal','/assets/images/Brinjal.jpeg',29);
    INSERT INTO crops(title,imageurl,rate)VALUES('wheat','/assets/images/wheat.jpg',29);
    INSERT INTO crops(title,imageurl,rate)VALUES('pea','/assets/images/pea.jpeg',50);
    INSERT INTO crops(title,imageurl,rate)VALUES('soyabean','/assets/images/soyabean.jpg',60);




    INSERT INTO goodscollections (collectioncenterid,farmerid, cropid, containertype, quantity, weight, collectiondate) VALUES
    (1,1, 2, 'bags', 40,  200, '2023-01-20 13:30:00'),
    (1,1, 1, 'crates', 50,  250, '2023-01-20 13:30:00'),
    (1,1, 3, 'polythene bags', 120,  600, '2023-01-20 13:30:00'),
    (1,1, 4, 'crates', 73,  373,  '2023-01-20 13:30:00'),
    (1,1, 2, 'bags', 30,  300, '2023-01-20 13:30:00'),
    (1,1, 1, 'crates', 40,  400, '2023-01-20 13:30:00'),
    (1,1, 3, 'polythene bags', 120,  640, '2023-01-20 13:30:00'),
    (1,1, 4, 'crates', 74,  475,  '2023-06-20 13:30:00'),
    (1,2, 2, 'bags', 40,  400, '2023-07-20 13:30:00'),
    (1,2, 1, 'crates', 30,  250, '2023-07-20 13:30:00'),
    (1,2, 3, 'polythene bags', 10,  60, '2023-07-20 13:30:00'),
    (1,2, 4, 'crates', 72,  372,  '2023-07-20 13:30:00'),
    (1,2, 2, 'bags', 42,  2300, '2023-07-20 13:30:00'),
    (1,2, 1, 'crates', 30,  240, '2022-05-20 13:30:00'),
    (1,3, 3, 'polythene bags', 13,  200, '2022-04-20 13:30:00'),
    (1,3, 4, 'crates', 25,  275,  '2022-04-20 13:30:00'),
    (1,3, 2, 'bags', 20,  230, '2022-04-20 13:30:00'),
    (1,3, 1, 'crates', 30,  120, '2022-04-20 13:30:00'),
    (1,3, 3, 'polythene bags', 20,  65, '2022-04-20 13:30:00'),
    (1,3, 4, 'crates', 25,  335,  '2022-03-20 13:30:00'),
    (1,3, 2, 'bags', 43,  204, '2022-03-20 13:30:00'),
    (2,1, 2, 'crates', 130,  2544, '2022-03-20 13:30:00'),
    (2,1, 3, 'polythene bags', 20,  240, '2022-03-20 13:30:00'),
    (2,1, 4, 'crates', 35,  374,  '2022-03-20 13:30:00'),
    (2,1, 2, 'bags', 40,  400, '2022-03-20 13:30:00'),
    (2,1, 2, 'crates', 20,  220, '2022-03-20 13:30:00'),
    (2,1, 3, 'polythene bags', 122,  560, '2022-03-20 13:30:00'),
    (2,1, 4, 'crates', 74,  375,  '2022-03-20 13:30:00'),
    (2,1, 2, 'bags', 44,  240, '2022-03-20 13:30:00'),
    (2,2, 2, 'crates', 53,  450, '2021-02-20 13:30:00'),
    (2,2, 3, 'polythene bags', 320,  890, '2021-02-20 13:30:00'),
    (2,2, 4, 'crates', 745,  1575,  '2021-02-20 13:30:00'),
    (2,2, 2, 'bags', 60,  340, '2021-02-20 13:30:00'),
    (2,2, 2, 'crates', 440,  2450, '2021-02-20 13:30:00'),
    (2,2, 3, 'polythene bags', 15,  560, '2021-02-20 13:30:00'),
    (2,3, 4, 'crates', 35,  372,  '2021-02-20 13:30:00'),
    (2,3, 2, 'bags', 42,  220, '2021-02-20 13:30:00'),
    (2,3, 2, 'crates', 20,  130, '2021-02-20 13:30:00'),
    (2,3, 3, 'polythene bags', 140,  780, '2021-02-20 13:30:00'),
    (2,3, 4, 'crates', 72,  374,  '2021-02-20 13:30:00'),
    (2,3, 2, 'bags', 20,  450, '2021-02-20 13:30:00'),
    (3,1, 3, 'crates', 55,  678, '2021-02-20 13:30:00'),
    (3,1, 3, 'polythene bags', 420,  2345, '2021-01-20 13:30:00'),
    (3,1, 4, 'crates', 23,  374,  '2021-01-20 13:30:00'),
    (3,1, 2, 'bags', 43,  257, '2021-01-20 13:30:00'),
    (3,1, 3, 'crates', 52,  250, '2020-01-20 13:30:00'),
    (3,1, 3, 'polythene bags', 124,  656, '2020-01-20 13:30:00'),
    (3,1, 4, 'crates', 72,  385,  '2020-01-20 13:30:00'),
    (3,1, 2, 'bags', 44,  267, '2020-01-20 13:30:00'),
    (3,2, 3, 'crates', 30,  257, '2020-01-20 13:30:00'),
    (3,2, 3, 'polythene bags', 123,  667, '2020-01-20 13:30:00'),
    (3,2, 4, 'crates', 34,  332,  '2020-01-20 13:30:00'),
    (3,2, 2, 'bags', 67,  345, '2020-01-20 13:30:00'),
    (3,2, 3, 'crates', 57,  267, '2020-01-20 13:30:00'),
    (3,2, 3, 'polythene bags', 125,  604, '2020-01-20 13:30:00'),
    (3,3, 4, 'crates', 72,  374,  '2020-01-20 13:30:00'),
    (3,3, 4, 'crates', 74,  385,  '2020-05-20 13:30:00'),
    (3,3, 3, 'polythene bags', 225,  804, '2021-01-20 13:30:00'),
    (3,3, 4, 'crates', 72,  374,  '2022-01-20 13:30:00'),
    (3,3, 4, 'crates', 74,  385,  '2023-05-20 13:30:00'),
    (3,3, 4, 'crates', 74,  388,  '2023-04-22 13:30:00'),
    (3,3, 2, 'crates', 100,  387,  '2023-04-22 13:30:00');

    INSERT INTO verifiedgoodscollection(collectionid,grade,
    weight,inspectorid,inspectiondate) VALUES
    (1,'A',180,1,'2022-01-20 13:30:00'),
    (2,'B',225,1,'2022-01-20 13:30:00'),
    (3,'C',580,1,'2022-01-20 13:30:00'),
    (4,'D',340,1,'2022-01-20 13:30:00'),
    (5,'A',280,1,'2022-01-20 13:30:00'),
    (6,'B',375,1,'2022-01-20 13:30:00'),
    (7,'C',600,1,'2022-01-20 13:30:00'),
    (8,'D',450,1,'2022-01-20 13:30:00'),
    (9,'A',375,1,'2022-01-20 13:30:00'),
    (10,'B',225,1,'2022-01-20 13:30:00'),
    (11,'C',50,1,'2022-01-20 13:30:00'),
    (12,'D',330,1,'2022-01-20 13:30:00'),
    (13,'A',2100,1,'2022-01-20 13:30:00'),
    (14,'B',225,1,'2022-01-20 13:30:00'),
    (15,'C',180,1,'2022-01-20 13:30:00'),
    (16,'D',250,1,'2022-01-20 13:30:00'),
    (17,'A',200,1,'2022-01-20 13:30:00'),
    (18,'B',100,1,'2022-01-20 13:30:00'),
    (19,'C',50,1,'2022-01-20 13:30:00'),
    (20,'D',325,1,'2022-01-20 13:30:00'),
    (21,'A',180,1,'2022-01-20 13:30:00'),
    (22,'B',2475,2,'2022-01-20 13:30:00'),
    (23,'C',210,2,'2022-01-20 13:30:00'),
    (24,'D',350,2,'2022-01-20 13:30:00'),
    (25,'A',390,2,'2022-01-20 13:30:00'),
    (26,'B',200,2,'2022-01-20 13:30:00'),
    (27,'C',540,2,'2022-01-20 13:30:00'),
    (28,'D',350,2,'2022-01-20 13:30:00'),
    (29,'A',220,2,'2022-01-20 13:30:00'),
    (30,'B',425,2,'2022-01-20 13:30:00'),
    (31,'C',850,2,'2022-01-20 13:30:00'),
    (32,'D',1500,2,'2022-01-20 13:30:00'),
    (33,'A',320,2,'2022-01-20 13:30:00'),
    (34,'B',2250,2,'2022-01-20 13:30:00'),
    (35,'C',540,2,'2022-01-20 13:30:00'),
    (36,'D',350,2,'2022-01-20 13:30:00'),
    (37,'A',180,2,'2022-01-20 13:30:00'),
    (38,'B',115,2,'2022-01-20 13:30:00'),
    (39,'C',750,2,'2022-01-20 13:30:00');
    

    INSERT INTO shipments(vehicleid,merchantid,kilometers,shipmentdate) VALUES
    (1,1,55,'2023-07-20 13:30:00'),
    (2,1,100,'2023-07-20 13:30:00'),
    (3,1,40,'2023-06-20 13:30:00'),
    (4,1,70,'2023-06-20 13:30:00'),
    (5,1,60,'2023-05-20 13:30:00'),
    (6,1,40,'2023-05-20 13:30:00'),
    (7,1,105,'2023-03-20 13:30:00'),
    (8,2,17,'2022-04-21 13:30:00'),
    (9,2,145,'2022-03-21 13:30:00'),
    (10,2,112,'2022-02-21 13:30:00'),
    (11,2,55,'2022-01-20 13:30:00'),
    (12,2,100,'2022-05-20 13:30:00'),
    (1,2,40,'2022-07-20 13:30:00'),
    (2,1,70,'2022-06-20 13:30:00'),
    (3,1,60,'2021-04-20 13:30:00'),
    (4,3,40,'2021-03-20 13:30:00'),
    (5,3,105,'2021-03-20 13:30:00'),
    (6,3,17,'2021-02-21 13:30:00');



    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,1);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,2);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,3);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,4);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,5);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,6);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,7);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,8);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,9);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,10);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,11);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,12);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,13);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,14);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,15);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,16);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,17);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,18);

    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,19);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,20);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,21);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,22);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,23);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,24);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,25);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,26);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,27);

    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,28);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,29);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,30);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,31);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,32);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,33);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,34);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,35);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,36);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,37);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,38);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,39);


   