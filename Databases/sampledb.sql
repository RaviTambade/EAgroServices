    -- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
    
    INSERT INTO roles(name)VALUES('owner');
    INSERT INTO roles(name)VALUES ('farmer');
    INSERT INTO roles(name)VALUES('inspector');
    INSERT INTO roles(name)VALUES('transporter');
    INSERT INTO roles(name)VALUES('merchant');
    INSERT INTO userroles(userid,roleid)VALUES(1,1);
    INSERT INTO userroles(userid,roleid)VALUES(2,2);
    INSERT INTO userroles(userid,roleid)VALUES(3,3);
    INSERT INTO userroles(userid,roleid)VALUES(5,5);
    INSERT INTO userroles(userid,roleid)VALUES(4,4);
    INSERT INTO userroles(userid,roleid)VALUES(7,5);
    INSERT INTO userroles(userid,roleid)VALUES(8,5);
    INSERT INTO userroles(userid,roleid)VALUES(9,5);



    INSERT INTO transporters (corporateid,managerid) VALUES(6,3);
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
    INSERT INTO merchants (corporateid,managerid) VALUES(7,4);
    INSERT INTO merchants (corporateid,managerid) VALUES(8,5);



    INSERT INTO goodscollections (collectioncenterid,farmerid, cropid, containertype, quantity, weight, collectiondate) VALUES
    (1,2, 2, 'bags', 40,  200, '2022-01-20 13:30:00'),
    (1,2, 1, 'crates', 50,  250, '2022-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 120,  600, '2022-01-20 13:30:00'),
    (1,2, 4, 'crates', 75,  375,  '2022-01-20 13:30:00'),
    (1,2, 2, 'bags', 40,  200, '2022-01-20 13:30:00'),
    (1,2, 1, 'crates', 50,  250, '2022-01-20 13:30:00'),
    (1,2, 3, 'polythene bags', 120,  600, '2022-01-20 13:30:00'),
    (1,2, 4, 'crates', 75,  375,  '2022-01-20 13:30:00'),
    (1,2, 4, 'crates', 75,  375,  '2023-05-20 13:30:00');


    INSERT INTO verifiedgoodscollection(collectionid,grade,weight,inspectorid,inspectiondate) VALUES
    (1,'A',180,3,'2022-01-20 13:30:00'),
    (2,'B',225,3,'2022-01-20 13:30:00'),
    (3,'C',540,3,'2022-01-20 13:30:00'),
    (4,'D',330,3,'2022-01-20 13:30:00');

    INSERT INTO shipments(vehicleid,merchantid,kilometers,shipmentdate) VALUES
    (1,1,55,'2022-01-20 13:30:00'),
    (1,1,100,'2023-01-20 13:30:00'),
    (1,1,40,'2022-01-20 13:30:00'),
    (2,1,70,'2022-01-20 13:30:00'),
    (2,1,60,'2021-01-20 13:30:00'),
    (2,1,40,'2022-01-20 13:30:00'),
    (2,1,105,'2023-01-20 13:30:00'),
    (1,2,17,'2023-01-21 13:30:00'),
    (1,2,145,'2023-01-21 13:30:00'),
    (3,2,112,'2023-01-21 13:30:00');


    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,1);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (1,2);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,3);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (2,4);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (3,5);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (4,6);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (5,7);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (6,8);
    INSERT INTO shipmentItems(shipmentid,collectionid) VALUES (7,9);


    -- INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (1,20);
    -- INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (2,22);
    -- INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (3,25);
    -- INSERT INTO invoices(shipmentitemid,rateperkg) VALUES (4,12);




    -- CALL call_procedures_after_shipment_status_delivered(1); -- shipmentid
    -- CALL call_procedures_after_shipment_status_delivered(2); -- shipmentid


    -- CALL apply_total_freight_charges(2,@total_freight_charges);

    -- SELECT @total_freight_charges;


    -- CALL calculate_total_amount(1); 
    -- CALL calculate_total_amount(2); 
    -- CALL calculate_total_amount(3); 
    -- CALL calculate_total_amount(4);
