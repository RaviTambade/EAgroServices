-- Drop DATABASE IF EXISTS eagroservicesdb;
-- CREATE DATABASE eagroservicesdb;

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
INSERT INTO vehiclestype(type,rateperkm)VALUES('maximo',8);
INSERT INTO vehiclestype(type,rateperkm)VALUES('jito',10);
INSERT INTO vehiclestype(type,rateperkm)VALUES('pikup',7);
INSERT INTO vehiclestype(type,rateperkm)VALUES('pikup407',6);
INSERT INTO vehiclestype(type,rateperkm)VALUES('mahindra710',10);
INSERT INTO vehiclestype(type,rateperkm)VALUES('tata1109',8);


INSERT INTO crops(title, imageurl, rate) VALUES('Potato','/assets/images/potato.jpeg',32 );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Tomato',
        '/assets/images/tomato.jpeg',
        12
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Cabbage',
        '/assets/images/cabbage.jpeg',
        21
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Onion',
        '/assets/images/onion.jpg',
        22
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Bitroot',
        '/assets/images/beetroot.jpeg',
        30
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Beans',
        '/assets/images/beans.jpeg',
        29
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'Brinjal',
        '/assets/images/Brinjal.jpeg',
        29
    );

INSERT INTO
    crops(title, imageurl, rate)
VALUES
(
        'wheat',
        '/assets/images/wheat.jpeg',
        29
    );



    
INSERT INTO
    labourcharges(containertype, imageurl, rate)
VALUES
(
        'crates',
        '/assets/images/crates.jpeg',
        5
    );

INSERT INTO
    labourcharges(containertype, imageurl, rate)
VALUES
(
        'bags',
        '/assets/images/bags.jpeg',
        6
    );

INSERT INTO
    labourcharges(containertype, imageurl, rate)
VALUES
(
        'lenobags',
        '/assets/images/lenobags.jpeg',
        4
    );

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

INSERT INTO vendors(companyname,imageurl,transportid) VALUES ("OM Transports",'/assets/images/goodstransport.jpeg',5);
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3456',1,'/assets/images/truck.jpg');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3455',2,'/assets/images/truck1.jpeg');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3465',3,'/assets/images/truck2.webp');
INSERT INTO vehicles(vendorid,vehiclenumber,vehicletype,imageurl)VALUES(1, 'MH14RE3476',4,'/assets/images/truck3.jpeg');

INSERT INTO shipments(vehicleid,merchantid,kilometer,shipmentdate) VALUES

(1,5,55,'2022-01-20 13:30:00'),

(2,5,105,'2022-01-20 13:30:00');

SELECT * FROM roles;