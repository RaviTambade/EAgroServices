-- Active: 1677341008727@@127.0.0.1@3306@eagroservicesdb
    
    INSERT INTO roles(name)VALUES('owner');
    INSERT INTO roles(name)VALUES ('farmer');
    INSERT INTO roles(name)VALUES('inspector');
    INSERT INTO roles(name)VALUES('transporter');
    INSERT INTO roles(name)VALUES('merchant');
    INSERT INTO userroles(userid,roleid)VALUES(1,1);
    INSERT INTO userroles(userid,roleid)VALUES(2,2);
    INSERT INTO userroles(userid,roleid)VALUES(3,3);
    INSERT INTO userroles(userid,roleid)VALUES(3,5);
    INSERT INTO userroles(userid,roleid)VALUES(5,5);
    INSERT INTO userroles(userid,roleid)VALUES(4,4);
    INSERT INTO userroles(userid,roleid)VALUES(7,5);
    INSERT INTO userroles(userid,roleid)VALUES(8,5);
    INSERT INTO userroles(userid,roleid)VALUES(9,5);



    INSERT INTO transporters (corporateid,managerid) VALUES(6,4);
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"jito","MH142022");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"pickup","MH142222");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"tata1109","MH142322");
    INSERT INTO vehicles (transporterid,vehicletype,rtonumber) VALUES(1,"LP","MH142422");
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
    INSERT INTO crops(title,imageurl,rate)VALUES('wheat','/assets/images/wheat.jpeg',29);

    INSERT INTO collectioncenters (corporateid,inspectorid) VALUES(1,3);
    INSERT INTO merchants (corporateid,managerid) VALUES(5,9);
    INSERT INTO merchants (corporateid,managerid) VALUES(7,3);
    INSERT INTO merchants (corporateid,managerid) VALUES(8,5);



    INSERT INTO goodscollections (collectioncenterid,farmerid, cropid, containertype, quantity, weight, collectiondate) VALUES
    (1,2, 2, 'bags', 40,  200, '2023-01-20 13:30:00'),
    (1,2, 1, 'crates', 50,  250, '2023-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 120,  600, '2023-01-20 13:30:00'),
    (1,2, 4, 'crates', 73,  373,  '2023-01-20 13:30:00'),
    (1,2, 2, 'bags', 30,  300, '2023-01-20 13:30:00'),
    (1,2, 1, 'crates', 40,  400, '2023-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 120,  640, '2023-01-20 13:30:00'),
    (1,2, 4, 'crates', 74,  475,  '2023-06-20 13:30:00'),
     (1,2, 2, 'bags', 40,  400, '2023-07-20 13:30:00'),
    (1,2, 1, 'crates', 30,  250, '2023-07-20 13:30:00'),
    (1,2, 3, 'polythene bags', 10,  60, '2023-07-20 13:30:00'),
    (1,2, 4, 'crates', 72,  372,  '2023-07-20 13:30:00'),
    (1,2, 2, 'bags', 42,  2300, '2023-07-20 13:30:00'),
    (1,2, 1, 'crates', 30,  240, '2022-05-20 13:30:00'),
    (1,2, 3, 'polythene bags', 13,  200, '2022-04-20 13:30:00'),
    (1,2, 4, 'crates', 25,  275,  '2022-04-20 13:30:00'),
     (1,2, 2, 'bags', 20,  230, '2022-04-20 13:30:00'),
    (1,2, 1, 'crates', 30,  120, '2022-04-20 13:30:00'),
    (1,2, 3, 'polythene bags', 20,  65, '2022-04-20 13:30:00'),
    (1,2, 4, 'crates', 25,  335,  '2022-03-20 13:30:00'),
    (1,2, 2, 'bags', 43,  204, '2022-03-20 13:30:00'),
    (1,2, 1, 'crates', 130,  2544, '2022-03-20 13:30:00'),
    (1,2, 3, 'polythene bags', 20,  240, '2022-03-20 13:30:00'),
    (1,2, 4, 'crates', 35,  374,  '2022-03-20 13:30:00'),
     (1,2, 2, 'bags', 40,  400, '2022-03-20 13:30:00'),
    (1,2, 1, 'crates', 20,  220, '2022-03-20 13:30:00'),
    (1,2, 3, 'polythene bags', 122,  560, '2022-03-20 13:30:00'),
    (1,2, 4, 'crates', 74,  375,  '2022-03-20 13:30:00'),
    (1,2, 2, 'bags', 44,  240, '2022-03-20 13:30:00'),
    (1,2, 1, 'crates', 53,  450, '2021-02-20 13:30:00'),
    (1,2, 3, 'polythene bags', 320,  890, '2021-02-20 13:30:00'),
    (1,2, 4, 'crates', 745,  1575,  '2021-02-20 13:30:00'),
     (1,2, 2, 'bags', 60,  340, '2021-02-20 13:30:00'),
    (1,2, 1, 'crates', 440,  2450, '2021-02-20 13:30:00'),
    (1,2, 3, 'polythene bags', 15,  560, '2021-02-20 13:30:00'),
    (1,2, 4, 'crates', 35,  372,  '2021-02-20 13:30:00'),
    (1,2, 2, 'bags', 42,  220, '2021-02-20 13:30:00'),
    (1,2, 1, 'crates', 20,  130, '2021-02-20 13:30:00'),
    (1,2, 3, 'polythene bags', 140,  780, '2021-02-20 13:30:00'),
    (1,2, 4, 'crates', 72,  374,  '2021-02-20 13:30:00'),
     (1,2, 2, 'bags', 20,  450, '2021-02-20 13:30:00'),
    (1,2, 1, 'crates', 55,  678, '2021-02-20 13:30:00'),
    (1,2, 3, 'polythene bags', 420,  2345, '2021-01-20 13:30:00'),
    (1,2, 4, 'crates', 23,  374,  '2021-01-20 13:30:00'),
    (1,2, 2, 'bags', 43,  257, '2021-01-20 13:30:00'),
    (1,2, 1, 'crates', 52,  250, '2020-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 124,  656, '2020-01-20 13:30:00'),
    (1,2, 4, 'crates', 72,  385,  '2020-01-20 13:30:00'),
     (1,2, 2, 'bags', 44,  267, '2020-01-20 13:30:00'),
    (1,2, 1, 'crates', 30,  257, '2020-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 123,  667, '2020-01-20 13:30:00'),
    (1,2, 4, 'crates', 34,  332,  '2020-01-20 13:30:00'),
    (1,2, 2, 'bags', 67,  345, '2020-01-20 13:30:00'),
    (1,2, 1, 'crates', 57,  267, '2020-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 125,  604, '2020-01-20 13:30:00'),
    (1,2, 4, 'crates', 72,  374,  '2020-01-20 13:30:00'),
    (1,2, 4, 'crates', 74,  385,  '2020-05-20 13:30:00'),
     (1,2, 3, 'polythene bags', 225,  804, '2021-01-20 13:30:00'),
    (1,2, 4, 'crates', 72,  374,  '2022-01-20 13:30:00'),
    (1,2, 4, 'crates', 74,  385,  '2023-05-20 13:30:00');



    INSERT INTO verifiedgoodscollection(collectionid,grade,
    weight,inspectorid,inspectiondate) VALUES
    (1,'A',180,3,'2022-01-20 13:30:00'),
    (2,'B',225,3,'2022-01-20 13:30:00'),
    (3,'C',540,3,'2022-01-20 13:30:00'),
    (4,'D',330,3,'2022-01-20 13:30:00'),
    (5,'A',180,3,'2022-01-20 13:30:00'),
    (6,'B',225,3,'2022-01-20 13:30:00'),
    (7,'C',540,3,'2022-01-20 13:30:00'),
    (8,'D',330,3,'2022-01-20 13:30:00'),
    (9,'A',180,3,'2022-01-20 13:30:00'),
    (10,'B',225,3,'2022-01-20 13:30:00'),
    (11,'C',540,3,'2022-01-20 13:30:00'),
    (12,'D',330,3,'2022-01-20 13:30:00'),
    (13,'A',180,3,'2022-01-20 13:30:00'),
    (14,'B',225,3,'2022-01-20 13:30:00'),
    (15,'C',540,3,'2022-01-20 13:30:00'),
    (16,'D',330,3,'2022-01-20 13:30:00'),
    (17,'A',180,3,'2022-01-20 13:30:00'),
    (18,'B',225,3,'2022-01-20 13:30:00'),
    (19,'C',540,3,'2022-01-20 13:30:00'),
    (20,'D',330,3,'2022-01-20 13:30:00'),
    (21,'A',180,3,'2022-01-20 13:30:00'),
    (22,'B',225,3,'2022-01-20 13:30:00'),
    (23,'C',540,3,'2022-01-20 13:30:00'),
    (24,'D',330,3,'2022-01-20 13:30:00'),
    (25,'A',180,3,'2022-01-20 13:30:00'),
    (26,'B',225,3,'2022-01-20 13:30:00'),
    (27,'C',540,3,'2022-01-20 13:30:00'),
    (28,'D',330,3,'2022-01-20 13:30:00'),
    (29,'A',180,3,'2022-01-20 13:30:00'),
    (30,'B',225,3,'2022-01-20 13:30:00'),
    (31,'C',540,3,'2022-01-20 13:30:00'),
    (32,'D',330,3,'2022-01-20 13:30:00'),
    (33,'A',180,3,'2022-01-20 13:30:00'),
    (34,'B',225,3,'2022-01-20 13:30:00'),
    (35,'C',540,3,'2022-01-20 13:30:00'),
    (36,'D',330,3,'2022-01-20 13:30:00'),
    (37,'A',180,3,'2022-01-20 13:30:00'),
    (38,'B',225,3,'2022-01-20 13:30:00'),
    (39,'C',540,3,'2022-01-20 13:30:00'),
    (40,'D',330,3,'2022-01-20 13:30:00'),
    (41,'A',180,3,'2022-01-20 13:30:00'),
    (42,'B',225,3,'2022-01-20 13:30:00'),
    (43,'C',540,3,'2022-01-20 13:30:00'),
    (44,'D',330,3,'2022-01-20 13:30:00'),
    (45,'A',180,3,'2022-01-20 13:30:00'),
    (46,'B',225,3,'2022-01-20 13:30:00'),
    (47,'C',540,3,'2022-01-20 13:30:00'),
    (48,'D',330,3,'2022-01-20 13:30:00'),
    (49,'A',180,3,'2022-01-20 13:30:00'),
    (50,'B',225,3,'2022-01-20 13:30:00'),
    (51,'C',540,3,'2022-01-20 13:30:00'),
    (52,'D',330,3,'2022-01-20 13:30:00'),
    (53,'A',180,3,'2022-01-20 13:30:00'),
    (54,'B',225,3,'2022-01-20 13:30:00'),
    (55,'C',540,3,'2022-01-20 13:30:00'),
    (56,'D',330,3,'2022-01-20 13:30:00'),
    (57,'A',180,3,'2022-01-20 13:30:00'),
    (58,'B',225,3,'2022-01-20 13:30:00'),
    (59,'C',540,3,'2022-01-20 13:30:00'),
    (60,'D',330,3,'2022-01-20 13:30:00');
    
    


    INSERT INTO shipments(vehicleid,merchantid,kilometers,shipmentdate) VALUES
    (1,1,55,'2023-07-20 13:30:00'),
    (2,1,100,'2023-07-20 13:30:00'),
    (3,1,40,'2023-06-20 13:30:00'),
    (3,1,70,'2023-06-20 13:30:00'),
    (2,1,60,'2023-05-20 13:30:00'),
    (4,1,40,'2023-05-20 13:30:00'),
    (4,1,105,'2023-03-20 13:30:00'),
    (1,2,17,'2022-04-21 13:30:00'),
    (1,2,145,'2022-03-21 13:30:00'),
    (3,2,112,'2022-02-21 13:30:00'),
     (3,1,55,'2022-01-20 13:30:00'),
    (4,1,100,'2022-05-20 13:30:00'),
    (3,1,40,'2022-07-20 13:30:00'),
    (2,1,70,'2022-06-20 13:30:00'),
    (1,1,60,'2021-04-20 13:30:00'),
    (1,1,40,'2021-03-20 13:30:00'),
    (3,1,105,'2021-03-20 13:30:00'),
    (1,2,17,'2021-02-21 13:30:00'),
    (1,2,145,'2021-01-21 13:30:00'),
    (3,2,112,'2021-08-21 13:30:00');


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
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,40);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (18,41);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (19,42);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (19,43);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (19,44);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (19,45);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (20,46);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (20,47);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (20,48);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (20,49);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (20,50);



    INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (1,20);
    INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (2,22);
    INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (3,25);
    INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (4,12);




    -- CALL call_procedures_after_shipment_status_delivered(1); -- shipmentid
    -- CALL call_procedures_after_shipment_status_delivered(2); -- shipmentid
   


    -- CALL apply_total_freight_charges(2,@total_freight_charges);

    -- SELECT @total_freight_charges;
SELECT * FROM invoices;

    -- CALL calculate_total_amount(1); 
    -- CALL calculate_total_amount(2); 
    -- CALL calculate_total_amount(3); 
    -- CALL calculate_total_amount(4);
 CALL call_all_procedures_for_charges(20);
 CALL call_all_procedures_for_totalamount(70);
SELECT * FROM goodscollections;
SELECT * FROM invoices;