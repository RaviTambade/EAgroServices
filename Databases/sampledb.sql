-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
    
    -- INSERT INTO roles(name)VALUES('collection manager');
    -- INSERT INTO roles(name)VALUES ('farmer');
    -- INSERT INTO roles(name)VALUES('inspector');
    -- INSERT INTO roles(name)VALUES('transporter');
    -- INSERT INTO roles(name)VALUES('merchant');
    
    -- INSERT INTO userroles(userid,roleid)VALUES(1,2);
    -- INSERT INTO userroles(userid,roleid)VALUES(2,2);
    -- INSERT INTO userroles(userid,roleid)VALUES(3,2);

    -- INSERT INTO userroles(userid,roleid)VALUES(4,1);
    -- INSERT INTO userroles(userid,roleid)VALUES(5,1);
    -- INSERT INTO userroles(userid,roleid)VALUES(6,1);
    -- INSERT INTO userroles(userid,roleid)VALUES(7,4);
    -- INSERT INTO userroles(userid,roleid)VALUES(8,4);
    -- INSERT INTO userroles(userid,roleid)VALUES(9,4);
    -- INSERT INTO userroles(userid,roleid)VALUES(10,5);
    -- INSERT INTO userroles(userid,roleid)VALUES(11,5);
    -- INSERT INTO userroles(userid,roleid)VALUES(12,5);
    -- INSERT INTO userroles(userid,roleid)VALUES(13,3);
    -- INSERT INTO userroles(userid,roleid)VALUES(14,3);
    -- INSERT INTO userroles(userid,roleid)VALUES(15,2);
    -- INSERT INTO userroles(userid,roleid)VALUES(16,2);

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
     (1,1, 2, 'crates', 25, 550, '2024-03-24 13:30:00'),
     (1,2, 4, 'bags',200,  11200, '2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 30,  660, '2024-03-24 13:30:00'),
     (1,3, 1, 'bags', 150,  8700,  '2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 40,  880, '2024-03-24 13:30:00'),
     (1,1, 3, 'polythene bags', 40,  400, '2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 45,  990, '2024-03-24 13:30:00'),
     (1,1,4,'polythene bags',75, 4125,'2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 55,  1210, '2024-03-24 13:30:00'),
     (1,15, 1, 'bags', 200,  11600, '2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 60,  1320, '2024-03-24 13:30:00'),
     (1,15, 4, 'bags',175,  9625,  '2024-03-24 13:30:00'),
     (1,1, 2, 'crates', 45,990, '2024-03-24 13:30:00'),
     (1,16, 1, 'bags',300,17400, '2024-03-23 13:30:00'),
     (1,1, 2, 'crates', 35,  770, '2024-03-23 13:30:00'),
     (1,1, 2, 'crates', 35,  770, '2024-03-23 13:30:00'),
     (1,16, 4, 'bags', 400,  22000,  '2024-03-23 13:30:00'),
     (1,1, 2, 'crates', 18,  396, '2024-03-23 13:30:00'),
     (1,1, 1, 'bags', 300,16500, '2024-03-23 13:30:00'),
     (1,1,2, 'crates', 5,  110, '2024-03-23 13:30:00'),
     (1,1, 4, 'bags', 25,1375,  '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 43,  204, '2024-03-23 13:30:00'),
     (1,15, 9, 'crates', 200,  17000, '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 20,  240, '2024-03-23 13:30:00'),
     (1,3,10, 'bags', 150,  12750,  '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 40,  400, '2024-03-23 13:30:00'),
     (1,2,10, 'bags', 55,  4675, '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 122,  560, '2024-03-23 13:30:00'),
     (1,1, 4, 'crates', 75,6375,  '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 44,  240, '2024-03-23 13:30:00'),
     (1,3, 3, 'polythene bags', 80,  890, '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 745,  1575,  '2024-03-23 13:30:00'),
     (1,2,8, 'bags',12,1200, '2024-03-23 13:30:00'),
     (1,16, 2, 'crates', 440,  2450, '2024-03-23 13:30:00'),
     (1,3,6, 'polythene bags', 15,  560, '2023-10-05 13:30:00'),
     (1,16, 2, 'crates', 35,  372,  '2023-10-06 13:30:00'),
     (1,2,2, 'bags', 12,  1150, '2023-10-07 13:30:00'),
     (1,16, 2, 'crates', 20,  130, '2023-10-08 13:30:00'),
     (1,15,10, 'bags', 55,  4675,'2023-10-09 13:30:00'),
     (1,16, 2, 'crates', 72,  374,  '2023-10-10 13:30:00'),
     (1,15,1, 'bags',300,17400, '2023-10-11 13:30:00'),
    (3,1, 7, 'polythene bags', 55,  678, '2023-10-12 13:30:00'),
    (3,2, 2, 'crates', 20, 440, '2023-10-13 13:30:00'),
    (3,2, 7, 'polythene bags', 23,  374,  '2023-10-14 13:30:00'),
    (3,2, 2, 'crates', 35,770, '2023-10-15 13:30:00'),
    (3,1,7, 'polythene bags', 52,  250, '2023-10-16 13:30:00'),
    (3,2, 2, 'crates', 45,  990, '2023-10-17 13:30:00'),
    (3,2,6, 'polythene bags', 72,  385,  '2023-10-18 13:30:00'),
    (3,2, 2, 'crates', 75,1650, '2023-10-19 13:30:00'),
    (3,15,6, 'polythene bags', 30,  257, '2023-10-20 13:30:00'),
    (3,2, 2, 'crates', 85, 1870, '2023-10-21 13:30:00'),
    (3,15,6, 'polythene bags', 34,  332,  '2023-10-22 13:30:00'),
    (3,2, 2, 'crates',70,1540, '2023-10-23 13:30:00'),
    (3,16, 3, 'polythene bags', 57,  267, '2023-10-24 13:30:00'),
    (3,2, 2, 'crates', 55,  1210, '2024-03-23 13:30:00'),
    (3,16,4, 'bags', 25,2125,  '2024-03-23 13:30:00'),
    (3,2, 2, 'crates', 40,  880,  '2024-03-23 13:30:00'),
    (3,16,10, 'bags', 18,1530, '2024-03-23 13:30:00'),
    (3,2, 2, 'crates', 25, 550,  '2024-03-23 13:30:00'),
    (3,16,1, 'bags', 30,2640,  '2023-10-30 13:30:00'),
    (3,2, 2, 'crates', 12,  264,  '2023-10-31 13:30:00'),    
     (1,15, 2, 'crates', 25, 590, '2023-09-01 13:30:00'),
     (1,3, 4, 'bags',210,  11400, '2023-09-02 13:30:00'),
     (1,15,2,'crates',35,820,'2023-09-03 13:30:00'),
     (1,1, 1, 'bags', 150,  8850,  '2023-09-04 13:30:00'),
     (1,15, 2, 'crates', 38,  895, '2023-09-05 13:30:00'),
     (1,2, 3, 'polythene bags', 40,850, '2023-09-06 13:30:00'),
     (1,15, 2,'crates', 40,  965, '2023-09-07 13:30:00'),
     (1,2,4,'polythene bags',75, 4255,'2023-09-08 13:30:00'),
     (1,15, 2, 'crates', 50,  1250, '2023-09-09 13:30:00'),
     (1,1, 1, 'bags', 200,  11354, '2023-09-10 13:30:00'),
     (1,15, 2, 'crates', 65,  1450, '2023-09-11 13:30:00'),
     (1,3, 4, 'bags',175,  9755,  '2023-09-12 13:30:00'),
     (1,15, 2, 'crates',40,910, '2023-09-13 13:30:00'),
     (1,1, 1, 'bags',325,18850, '2023-09-14 13:30:00'),
     (1,15, 2, 'crates', 35,810, '2023-09-15 13:30:00'),
     (1,15, 2, 'crates', 28,  790, '2023-09-16 13:30:00'),
     (1,3, 4, 'bags', 425,  22946,  '2023-09-17 13:30:00'),
     (1,15, 2, 'crates', 15,  410, '2023-09-18 13:30:00'),
     (1,2, 1, 'bags', 300,16610, '2023-09-19 13:30:00'),
     (1,15,2, 'crates', 7,150, '2023-09-20 13:30:00'),
     (1,15, 4, 'bags', 25,1405,  '2023-09-21 13:30:00'),
     (2,3, 2, 'crates',15,350, '2023-09-22 13:30:00'),
     (2,1, 9, 'crates',200,17320, '2023-09-23 13:30:00'),
     (2,3,2, 'crates',25,650, '2023-09-24 13:30:00'),
     (2,1,10, 'bags',155,12950,  '2023-09-25 13:30:00'),
     (2,3,2, 'crates',40,890, '2023-09-26 13:30:00'),
     (2,1,10, 'bags', 65,  5520, '2023-09-27 13:30:00'),
     (2,3, 2, 'crates',65,2780, '2023-09-28 13:30:00'),
     (2,2, 4, 'crates', 65,5950,  '2023-09-29 13:30:00'),
     (2,3,2, 'crates', 70,1620, '2023-09-30 13:30:00'),
     (2,1, 3, 'polythene bags', 25,1050, '2023-10-01 13:30:00'),
     (2,3,2, 'crates',40,920,  '2023-10-02 13:30:00'),
     (2,1,8, 'bags',15,1310, '2023-10-03 13:30:00'),
     (2,3,2, 'crates',30,740, '2023-10-04 13:30:00'),
     (2,1,6, 'polythene bags',20,710, '2023-10-05 13:30:00'),
     (2,3,2, 'crates',25,620,  '2023-10-06 13:30:00'),
     (2,1,2, 'bags', 15,1320, '2023-10-07 13:30:00'),
     (2,3,2, 'crates',15,410, '2023-10-08 13:30:00'),
     (2,15,10, 'bags', 55,  4950,'2023-10-09 13:30:00'),
     (2,3,2, 'crates',10,240,  '2023-10-10 13:30:00'),
     (2,15,1, 'bags',300,17850, '2023-10-11 13:30:00'),
     (3,3, 7, 'polythene bags', 55,  710, '2023-10-12 13:30:00'),
     (3,2, 2, 'crates', 20, 465, '2023-10-13 13:30:00'),
     (3,1, 7, 'polythene bags', 23,  395,  '2023-10-14 13:30:00'),
     (3,2, 2, 'crates', 35,785, '2023-10-15 13:30:00'),
     (3,3,7, 'polythene bags', 52,  290, '2023-10-16 13:30:00'),
     (3,2, 2, 'crates', 45,  1110, '2023-10-17 13:30:00'),
     (3,3,6, 'polythene bags', 72,  410,  '2023-10-18 13:30:00'),
     (3,2, 2, 'crates', 75,1710, '2023-10-19 13:30:00'),
     (3,15,6, 'polythene bags', 30,  310, '2023-10-20 13:30:00'),
     (3,2, 2, 'crates', 85, 1910, '2023-10-21 13:30:00'),
     (3,15,6, 'polythene bags', 34,  350,  '2023-10-22 13:30:00'),
     (3,2, 2, 'crates',70,1610, '2023-10-23 13:30:00'),
     (3,16, 3, 'polythene bags', 57,  310, '2023-10-24 13:30:00'),
     (3,2, 2, 'crates', 55,  1310, '2023-10-25 13:30:00'),
     (3,16,4, 'bags', 25,2264,  '2023-10-26 13:30:00'),
     (3,2, 2, 'crates',40,  910,  '2023-10-27 13:30:00'),
     (3,16,10, 'bags', 18,1610, '2023-10-28 13:30:00'),
     (3,2, 2, 'crates',28,710, '2023-10-29 13:30:00'),
     (3,16,1, 'bags',25,2610, '2023-10-30 13:30:00'),
     (3,2, 2, 'crates', 14,310,'2023-10-31 13:30:00'),
    --  November Unverified data 
    (1,2, 2, 'crates',82,1810, '2023-11-01 13:30:00'),
    (2,2,6, 'polythene bags',25,1410, '2023-11-01 13:30:00'),
    (3,2, 2, 'crates', 85, 1910, '2023-11-01 13:30:00'),
    (1,1,6, 'polythene bags',35,2110, '2023-11-01 13:30:00'),
    (2,1, 2, 'crates',70,1610,'2023-11-01 13:30:00'),
    (3,1, 3, 'polythene bags',58,3320, '2023-11-01 13:30:00'),
    (1,15, 2, 'crates', 55, 1310, '2023-11-02 13:30:00'),
    (2,15,4, 'bags', 25,2210, '2023-11-02 13:30:00'),
    (3,15, 2, 'crates',40, 910, '2023-11-02 13:30:00'),
    (1,16,10, 'bags',20,1315, '2023-11-02 13:30:00'),
    (2,16, 2, 'crates', 25, 610, '2023-11-02 13:30:00'),
    (3,16,1, 'bags',35,3110, '2023-11-02 13:30:00'),
    (1,3, 2, 'crates', 12, 310, '2023-11-03 13:30:00'),
    (2,3,10, 'bags', 18,1610, '2023-11-03 13:30:00'),
    (2,1,6, 'polythene bags', 25, 257, '2023-11-01 13:30:00'),
    (2,1,6, 'polythene bags', 40, 360, '2023-11-02 13:30:00'),
    (2,1,6, 'polythene bags', 35, 320, '2023-11-03 13:30:00'),
    (2,1,6, 'polythene bags', 15, 210, '2023-11-04 13:30:00'),
    (2,1,6, 'polythene bags', 30, 265, '2023-11-05 13:30:00'),  
    (3,3,6, 'bags',12,1115, '2023-11-03 13:30:00'),
    (1,1, 2, 'crates', 75,1650, '2023-11-01 13:30:00'),
    (2,1,6, 'polythene bags', 30, 257, '2023-11-01 13:30:00'),
    (3,1, 2, 'crates', 85, 1870, '2023-11-01 13:30:00'),
    (1,2,6, 'polythene bags', 34, 332, '2023-11-01 13:30:00'),
    (2,2, 2, 'crates',70,1540, '2023-11-01 13:30:00'),
    (3,2, 3, 'polythene bags', 57, 267, '2023-11-01 13:30:00'),
    (1,3, 2, 'crates', 55, 1210, '2023-11-02 13:30:00'),
    (2,3,4, 'bags', 25,2125, '2023-11-02 13:30:00'),
    (3,3, 2, 'crates', 40, 880, '2023-11-02 13:30:00'),
    (1,15,10, 'bags', 18,1530, '2023-11-02 13:30:00'),
    (2,15, 2, 'crates', 25, 550, '2023-11-02 13:30:00'),
    (3,15,1, 'bags', 30,2640, '2023-11-02 13:30:00'),
    (1,16, 2, 'crates', 12, 264, '2023-11-03 13:30:00'),
    (2,16,10, 'bags', 18,1530, '2023-11-03 13:30:00'),
    (3,16,6, 'bags', 18,1530, '2023-11-03 13:30:00'),
        (1,2, 2, 'crates',82,1810, '2023-11-01 13:30:00'),
    (2,2,6, 'polythene bags',25,1410, '2023-11-01 13:30:00'),
    (3,2, 2, 'crates', 85, 1910, '2023-11-01 13:30:00'),
    (1,1,6, 'polythene bags',35,2110, '2023-11-01 13:30:00'),
    (2,1, 2, 'crates',70,1610,'2023-11-01 13:30:00'),
    (3,1, 3, 'polythene bags',58,3320, '2023-11-01 13:30:00'),
    (1,15, 2, 'crates', 55, 1310, '2023-11-02 13:30:00'),
    (2,15,4, 'bags', 25,2210, '2023-11-02 13:30:00'),
    (3,15, 2, 'crates',40, 910, '2023-11-02 13:30:00'),
    (1,16,10, 'bags',20,1315, '2023-11-02 13:30:00'),
    (2,16, 2, 'crates', 25, 610, '2023-11-02 13:30:00'),
    (3,16,1, 'bags',35,3110, '2023-11-02 13:30:00'),
    (1,3, 2, 'crates', 12, 310, '2023-11-03 13:30:00'),
    (2,3,10, 'bags', 18,1610, '2023-11-03 13:30:00'),
 (1,2, 2, 'crates',82,1810, '2023-11-01 13:30:00'),
    (2,2,6, 'polythene bags',25,1410, '2023-11-01 13:30:00'),
    (3,2, 2, 'crates', 85, 1910, '2023-11-01 13:30:00'),
    (1,1,6, 'polythene bags',35,2110, '2023-11-01 13:30:00'),
    (2,1, 2, 'crates',70,1610,'2023-11-01 13:30:00'),
    (3,1, 3, 'polythene bags',58,3320, '2023-11-01 13:30:00'),
    (1,15, 2, 'crates', 55, 1310, '2023-11-02 13:30:00'),
    (2,15,4, 'bags', 25,2210, '2023-11-02 13:30:00'),
    (3,15, 2, 'crates',40, 910, '2023-11-02 13:30:00'),
    (1,16,10, 'bags',20,1315, '2023-11-02 13:30:00'),
    (2,16, 2, 'crates', 25, 610, '2023-11-02 13:30:00'),
    (3,16,1, 'bags',35,3110, '2023-11-02 13:30:00'),
    (1,3, 2, 'crates', 12, 310, '2023-11-03 13:30:00'),
    (2,3,10, 'bags', 18,1610, '2023-11-03 13:30:00'),
    (2,1,6, 'polythene bags', 25, 257, '2023-11-01 13:30:00'),
    (2,1,6, 'polythene bags', 40, 360, '2023-11-02 13:30:00'),
    (2,1,6, 'polythene bags', 35, 320, '2023-11-03 13:30:00'),
    (2,1,6, 'polythene bags', 15, 210, '2023-11-04 13:30:00'),
    (2,1,6, 'polythene bags', 30, 265, '2023-11-05 13:30:00'),  
    (3,3,6, 'bags',12,1115, '2023-11-03 13:30:00'),
    (1,1, 2, 'crates', 75,1650, '2023-11-01 13:30:00'),
    (2,1,6, 'polythene bags', 30, 257, '2023-11-01 13:30:00'),
    (3,1, 2, 'crates', 85, 1870, '2023-11-01 13:30:00'),
    (1,2,6, 'polythene bags', 34, 332, '2023-11-01 13:30:00'),
    (2,2, 2, 'crates',70,1540, '2023-11-01 13:30:00'),
    (3,2, 3, 'polythene bags', 57, 267, '2023-11-01 13:30:00'),
    (1,3, 2, 'crates', 55, 1210, '2023-11-02 13:30:00'),
    (2,3,4, 'bags', 25,2125, '2023-11-02 13:30:00'),
    (3,3, 2, 'crates', 40, 880, '2023-11-02 13:30:00'),
    (1,15,10, 'bags', 18,1530, '2023-11-02 13:30:00'),
    (2,15, 2, 'crates', 25, 550, '2023-11-02 13:30:00'),
    (3,15,1, 'bags', 30,2640, '2023-11-02 13:30:00'),
    (1,16, 2, 'crates', 12, 264, '2023-11-03 13:30:00'),
    (2,16,10, 'bags', 18,1530, '2023-11-03 13:30:00'),
    (3,16,6, 'bags', 18,1530, '2023-11-03 13:30:00'),
        (1,2, 2, 'crates',82,1810, '2023-11-01 13:30:00'),
    (2,2,6, 'polythene bags',25,1410, '2023-11-01 13:30:00'),
    (3,2, 2, 'crates', 85, 1910, '2023-11-01 13:30:00'),
    (1,1,6, 'polythene bags',35,2110, '2023-11-01 13:30:00'),
    (2,1, 2, 'crates',70,1610,'2023-11-01 13:30:00'),
    (3,1, 3, 'polythene bags',58,3320, '2023-11-01 13:30:00'),
    (1,15, 2, 'crates', 55, 1310, '2023-11-02 13:30:00'),
    (2,15,4, 'bags', 25,2210, '2023-11-02 13:30:00'),
    (3,15, 2, 'crates',40, 910, '2023-11-02 13:30:00'),
    (1,16,10, 'bags',20,1315, '2023-11-02 13:30:00'),
    (2,16, 2, 'crates', 25, 610, '2023-11-02 13:30:00'),
    (3,16,1, 'bags',35,3110, '2023-11-02 13:30:00'),
    (1,3, 2, 'crates', 12, 310, '2023-11-03 13:30:00'),
    (2,3,10, 'bags', 18,1610, '2023-11-03 13:30:00');




INSERT INTO verifiedgoodscollection(collectionid,grade,
    weight,inspectorid,inspectiondate) VALUES
    (1,'A',520,1,'2023-09-01 13:30:00'),
    (2,'B',11000,1,'2023-09-02 13:30:00'),
    (3,'C',600,1,'2023-09-03 13:30:00'),
    (4,'D',8000,1,'2023-09-04 13:30:00'),
    (5,'A',800,1,'2023-09-05 13:30:00'),
    (6,'B',375,1,'2023-09-06 13:30:00'),
    (7,'C',850,1,'2023-09-07 13:30:00'),
    (8,'D',4000,1,'2023-09-08 13:30:00'),
    (9,'A',1150,1,'2023-09-09 13:30:00'),
    (10,'B',11300,1,'2023-09-10 13:30:00'),
    (11,'C',1200,1,'2023-09-11 13:30:00'),
    (12,'D',9600,1,'2023-09-12 13:30:00'),
    (13,'A',900,1,'2023-09-13 13:30:00'),
    (14,'B',17000,1,'2023-09-14 13:30:00'),
    (15,'A',750,1,'2023-09-15 13:30:00'),
    (16,'A',700,1,'2023-09-16 13:30:00'),
    (17,'A',21500,1,'2023-09-17 13:30:00'),
    (18,'B',350,1,'2023-09-18 13:30:00'),
    (19,'C',16000,1,'2023-09-19 13:30:00'),
    (20,'D',80,1,'2023-09-20 13:30:00'),
    (21,'A',1300,1,'2023-09-21 13:30:00'),
    (22,'B',190,2,'2023-09-22 13:30:00'),
    (23,'C',16800,2,'2023-09-23 13:30:00'),
    (24,'D',200,2,'2023-09-24 13:30:00'),
    (25,'A',12500,2,'2023-09-25 13:30:00'),
    (26,'B',350,2,'2023-09-26 13:30:00'),
    (27,'C',4500,2,'2023-09-27 13:30:00'),
    (28,'D',500,2,'2023-09-28 13:30:00'),
    (29,'A',6200,2,'2023-09-29 13:30:00'),
    (30,'B',200,2,'2023-09-30 13:30:00'),
    (31,'A',850,1,'2023-10-01 13:30:00'),
    (32,'B',1500,1,'2023-10-02 13:30:00'),
    (33,'C',1100,1,'2023-10-03 13:30:00'),
    (34,'D',2300,1,'2023-10-04 13:30:00'),
    (35,'A',500,1,'2023-10-05 13:30:00'),
    (36,'B',350,1,'2023-10-06 13:30:00'),
    (37,'C',1100,1,'2023-10-07 13:30:00'),
    (38,'D',120,1,'2023-10-08 13:30:00'),
    (39,'A',4600,1,'2023-10-09 13:30:00'),
    (40,'B',4600,1,'2023-10-10 13:30:00'),
    (41,'C',17000,1,'2023-10-11 13:30:00'),
    (42,'D',625,1,'2023-10-12 13:30:00'),
    (43,'A',425,1,'2023-10-13 13:30:00'),
    (44,'B',350,1,'2023-10-14 13:30:00'),
    (45,'C',700,1,'2023-10-15 13:30:00'),
    (46,'D',200,1,'2023-10-16 13:30:00'),
    (47,'A',900,1,'2023-10-17 13:30:00'),
    (48,'B',300,1,'2023-10-18 13:30:00'),
    (49,'C',1625,1,'2023-10-19 13:30:00'),
    (50,'D',215,1,'2023-10-20 13:30:00'),
    (51,'A',1825,1,'2023-10-21 13:30:00'),
    (52,'B',300,2,'2023-10-22 13:30:00'),
    (53,'C',1475,2,'2023-10-23 13:30:00'),
    (54,'D',200,2,'2023-10-24 13:30:00'),
    (55,'A',1200,2,'2023-10-25 13:30:00'),
    (56,'B',2100,2,'2023-10-26 13:30:00'),
    (57,'C',800,2,'2023-10-27 13:30:00'),
    (58,'D',1430,2,'2023-10-28 13:30:00'),
    (59,'A',540,2,'2023-10-29 13:30:00'),
    (60,'B',2560,2,'2023-10-30 13:30:00'),
    (61,'B',250,2,'2023-10-31 13:30:00'),
    (61,'A',520,1,'2023-09-01 13:30:00'),
    (62,'B',11050,1,'2023-09-02 13:30:00'),
    (63,'C',615,1,'2023-09-03 13:30:00'),
    (64,'D',8110,1,'2023-09-04 13:30:00'),
    (65,'A',810,1,'2023-09-05 13:30:00'),
    (66,'B',800,1,'2023-09-06 13:30:00'),
    (67,'C',850,1,'2023-09-07 13:30:00'),
    (68,'D',3950,1,'2023-09-08 13:30:00'),
    (69,'A',1150,1,'2023-09-09 13:30:00'),
    (70,'B',11200,1,'2023-09-10 13:30:00'),
    (71,'C',1250,1,'2023-09-11 13:30:00'),
    (72,'D',9610,1,'2023-09-12 13:30:00'),
    (73,'A',800,1,'2023-09-13 13:30:00'),
    (74,'B',17500,1,'2023-09-14 13:30:00'),
    (75,'A',710,1,'2023-09-15 13:30:00'),
    (76,'A',710,1,'2023-09-16 13:30:00'),
    (77,'A',22500,1,'2023-09-17 13:30:00'),
    (78,'B',310,1,'2023-09-18 13:30:00'),
    (79,'C',16200,1,'2023-09-19 13:30:00'),
    (80,'D',70,1,'2023-09-20 13:30:00'),
    (81,'A',1310,1,'2023-09-21 13:30:00'),
    (82,'B',280,2,'2023-09-22 13:30:00'),
    (83,'C',16750,2,'2023-09-23 13:30:00'),
    (84,'D',500,2,'2023-09-24 13:30:00'),
    (85,'A',12540,2,'2023-09-25 13:30:00'),
    (86,'B',750,2,'2023-09-26 13:30:00'),
    (87,'C',5100,2,'2023-09-27 13:30:00'),
    (88,'D',2450,2,'2023-09-28 13:30:00'),
    (89,'A',5980,2,'2023-09-29 13:30:00'),
    (90,'B',1400,2,'2023-09-30 13:30:00'),
    (91,'A',890,1,'2023-10-01 13:30:00'),
    (92,'B',850,1,'2023-10-02 13:30:00'),
    (93,'C',1230,1,'2023-10-03 13:30:00'),
    (94,'D',550,1,'2023-10-04 13:30:00'),
    (95,'A',540,1,'2023-10-05 13:30:00'),
    (96,'B',500,1,'2023-10-06 13:30:00'),
    (97,'C',1120,1,'2023-10-07 13:30:00'),
    (98,'D',300,1,'2023-10-08 13:30:00'),
    (99,'A',4400,1,'2023-10-09 13:30:00'),
    (100,'B',210,1,'2023-10-10 13:30:00'),
    (101,'C',1725,1,'2023-10-11 13:30:00'),
    (102,'D',640,1,'2023-10-12 13:30:00'),
    (103,'A',380,1,'2023-10-13 13:30:00'),
    (104,'B',330,1,'2023-10-14 13:30:00'),
    (105,'C',750,1,'2023-10-15 13:30:00'),
    (106,'D',220,1,'2023-10-16 13:30:00'),
    (107,'A',950,1,'2023-10-17 13:30:00'),
    (108,'B',340,1,'2023-10-18 13:30:00'),
    (109,'C',1624,1,'2023-10-19 13:30:00'),
    (110,'D',210,1,'2023-10-20 13:30:00'),
    (111,'A',1834,1,'2023-10-21 13:30:00'),
    (112,'B',310,2,'2023-10-22 13:30:00'),
    (113,'C',1485,2,'2023-10-23 13:30:00'),
    (114,'D',210,2,'2023-10-24 13:30:00'),
    (115,'A',1190,2,'2023-10-25 13:30:00'),
    (116,'B',2010,2,'2023-10-26 13:30:00'),
    (117,'C',840,2,'2023-10-27 13:30:00'),
    (118,'D',1540,2,'2023-10-28 13:30:00'),
    (119,'A',565,2,'2023-10-29 13:30:00'),
    (120,'B',2530,2,'2023-10-30 13:30:00'),
    (121,'B',245,2,'2023-10-31 13:30:00');
    
    INSERT INTO verifiedgoodscollection(collectionid,grade,
    weight,inspectorid,inspectiondate) VALUES
      (224,'A',520,1,'2024-02-24 13:30:00'),
    (225,'B',11000,1,'2024-02-24 13:30:00'),
    (226,'C',600,1,'2024-02-24 13:30:00'),
    (227,'D',8000,1,'2024-02-24 13:30:00'),
    (228,'A',800,1,'2024-02-24 13:30:00'),
    (229,'B',375,1,'2024-02-24 13:30:00'),
    (230,'C',850,1,'2024-02-24 13:30:00'),
    (231,'D',4000,1,'2024-02-24 13:30:00'),
    (232,'A',1150,1,'2024-02-24 13:30:00'),
    (233,'B',11300,1,'2024-02-24 13:30:00'),
    (234,'C',1200,1,'2024-02-24 13:30:00'),
    (235,'D',9600,1,'2024-02-24 13:30:00'),
    (236,'A',900,1,'2024-02-24 13:30:00'),
    (237,'B',17000,1,'2024-02-24 13:30:00'),
    (238,'A',750,1,'2024-02-24 13:30:00'),
    (239,'A',700,1,'2024-02-24 13:30:00'),
    (240,'A',21500,1,'2024-02-24 13:30:00'),
    (241,'B',350,1,'2024-02-24 13:30:00'),
    (242,'C',16000,1,'2024-02-24 13:30:00'),
    (243,'D',80,1,'2024-02-24 13:30:00'),
    (244,'A',1300,1,'2024-02-24 13:30:00'),
    (245,'B',190,2,'2024-02-24 13:30:00'),
    (246,'C',16800,2,'2024-02-23 13:30:00'),
    (247,'D',200,2,'2024-02-23 13:30:00'),
    (248,'A',12500,2,'2024-02-23 13:30:00'),
    (249,'B',350,2,'2024-02-23 13:30:00'),
    (250,'C',4500,2,'2024-02-23 13:30:00'),
    (251,'D',500,2,'2024-02-23 13:30:00'),
    (252,'A',6200,2,'2024-02-23 13:30:00'),
    (253,'B',200,2,'2024-02-23 13:30:00'),
    (254,'A',850,1,'2024-02-23 13:30:00'),
    (255,'B',1500,1,'2024-02-23 13:30:00'),
    (256,'C',1100,1,'2024-02-23 13:30:00'),
    (257,'D',2300,1,'2024-02-23 13:30:00'),
    (258,'A',500,1,'2024-02-23 13:30:00');


    INSERT INTO shipments(vehicleid,merchantid,kilometers,shipmentdate) VALUES
    (1,1,55,'2023-09-01 13:30:00'),
    (2,1,100,'2023-09-02 13:30:00'),
    (3,1,40,'2023-09-03 13:30:00'),
    (4,1,70,'2023-09-04 13:30:00'),
    (5,1,60,'2023-09-05 13:30:00'),
    (6,1,40,'2023-09-06 13:30:00'),
    (7,1,105,'2023-09-07 13:30:00'),
    (8,2,17,'2023-09-08 13:30:00'),
    (9,2,145,'2023-09-09 13:30:00'),
    (10,2,112,'2023-09-10 13:30:00'),
    (11,2,55,'2023-09-11 13:30:00'),
    (12,2,100,'2023-09-12 13:30:00'),
    (1,1,55,'2023-09-13 13:30:00'),
    (2,1,100,'2023-09-14 13:30:00'),
    (3,1,40,'2023-09-15 13:30:00'),
    (4,1,70,'2023-09-16 13:30:00'),
    (5,1,60,'2023-09-17 13:30:00'),
    (6,1,40,'2023-09-18 13:30:00'),
    (7,1,105,'2023-09-19 13:30:00'),
    (8,2,17,'2023-09-20 13:30:00'),
    (9,2,145,'2023-09-21 13:30:00'),
    (10,2,112,'2023-09-22 13:30:00'),
    (11,2,55,'2023-09-23 13:30:00'),
    (12,2,100,'2023-09-24 13:30:00'),
    (1,1,55,'2023-09-25 13:30:00'),
    (2,1,100,'2023-09-26 13:30:00'),
    (3,1,40,'2023-09-27 13:30:00'),
    (4,1,70,'2023-09-28 13:30:00'),
    (5,1,60,'2023-09-29 13:30:00'),
    (6,1,40,'2023-09-30 13:30:00'),
    (7,1,105,'2023-10-01 13:30:00'),
    (8,2,17,'2023-10-02 13:30:00'),
    (9,2,145,'2023-10-03 13:30:00'),
    (10,2,112,'2023-10-04 13:30:00'),
    (11,2,55,'2023-10-05 13:30:00'),
    (12,2,100,'2023-10-06 13:30:00'),
    (1,2,40,'2023-10-07 13:30:00'),
    (2,1,70,'2023-10-08 13:30:00'),
    (3,1,60,'2023-10-09 13:30:00'),
    (4,3,40,'2023-10-11 13:30:00'),
    (5,3,105,'2023-10-12 13:30:00'),
    (6,3,17,'2023-10-13 13:30:00'),
    (1,2,40,'2023-10-14 13:30:00'),
    (2,1,70,'2023-10-15 13:30:00'),
    (3,1,60,'2023-10-16 13:30:00'),
    (4,3,40,'2023-10-17 13:30:00'),
    (5,3,105,'2023-10-18 13:30:00'),
    (6,3,17,'2023-10-19 13:30:00'),
    (1,2,40,'2023-10-20 13:30:00'),
    (2,1,70,'2023-10-21 13:30:00'),
    (3,1,60,'2023-10-22 13:30:00'),
    (4,3,40,'2023-10-23 13:30:00'),
    (5,3,105,'2023-10-24 13:30:00'),
    (6,3,17,'2023-10-25 13:30:00'),
    (2,1,70,'2023-10-26 13:30:00'),
    (3,1,60,'2023-10-27 13:30:00'),
    (4,3,40,'2023-10-28 13:30:00'),
    (5,3,105,'2023-10-29 13:30:00'),
    (5,3,105,'2023-10-30 13:30:00'),
    (6,3,17,'2023-10-31 13:30:00');

    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,1);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,2);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,3);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,4);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,5);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,6);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,7);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,8);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,9);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,10);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,11);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,12);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,13);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,14);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,15);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,16);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,17);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,18);

    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,19);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,20);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,21);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,22);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,23);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,24);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,25);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,26);
    -- INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,27);

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

    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,40);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,41);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,42);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,43);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,44);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,45);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,46);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,47);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,48);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,49);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,50);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,51);
    
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,52);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,53);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,54);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,55);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,56);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,57);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,58);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,59);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,60);
   
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,61);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,62);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,63);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,64);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,65);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,66);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,67);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,68);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,69);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,70);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,71);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,72);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,73);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,74);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,75);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,76);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (8,77);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,78);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (9,79);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,80);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (10,81);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,82);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (11,83);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,84);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (12,85);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,86);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,87);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,88);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,89);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,90);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,91);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,92);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,93);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,94);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,95);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,96);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,97);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,98);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,99);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,100);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,101);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,102);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,103);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,104);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,105);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,106);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,107);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,108);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,109);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,110);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,111);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (13,112);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,113);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (14,114);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,115);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (15,116);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,117);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (16,118);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,119);
INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (17,120);

-- CALL call_all_procedures_for_charges(18);
   
