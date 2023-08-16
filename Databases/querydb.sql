-- Active: 1677341008727@@127.0.0.1@3306@eagroservicesdb

    SELECT * FROM shipmentitems    
    JOIN goodscosting ON goodscosting.shippingitemid = shipmentitems.id
    JOIN shipments ON shipmentitems.shipmentid = shipments.id
    JOIN verifiedgoodscollection ON shipmentitems.collectionid = verifiedgoodscollection.collectionid
WHERE shipments.id = 1;

SELECT *
FROM vehicles
    INNER JOIN transporters ON vehicles.transporterid = transporters.id
WHERE transporters.id = 2;

SELECT 1
FROM
    `transporters` AS `t`
    INNER JOIN `vehicles` AS `v` ON `t`.`id` = `v`.`transporterid`
WHERE `t`.`id` = 1;

SELECT
    shipments.kilometers,
    shipments.shipmentdate
FROM vehicles
    INNER JOIN shipments ON vehicles.id = shipments.vehicleid
WHERE
    shipments.vehicleid = 2
GROUP BY shipments.id;

SELECT * FROM shipments WHERE id=1;

SELECT
    `s`.`id`,
    `s`.`kilometers`,
    `s`.`merchantid`,
    `s`.`shipmentdate`,
    `s`.`status`,
    `s`.`vehicleid`
FROM `shipments` AS `s`
WHERE `s`.`vehicleid` = 1;

SELECT *
FROM shippingitems
    JOIN goodscosting ON goodscosting.shippingitemid = shippingitems.id
    JOIN shipments ON shippingitems.shipmentid = shipments.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
WHERE shipments.id = 1;

SELECT * FROM userroles;

SELECT
    shipments.id,
    vehicles.rtonumber,
    kilometers,
    status,
    shipmentdate,
    apply_total_freight_charges(shipments.id) AS freightcharges
FROM shipments
    INNER JOIN vehicles ON shipments.vehicleid = vehicles.id
WHERE
    shipments.merchantid = 1;

SELECT *
FROM vehicles
    INNER JOIN transporters ON vehicles.transporterid = transporters.id
WHERE transporters.id = 2;

SELECT 1
FROM `transporters` AS `t`
    INNER JOIN `vehicles` AS `v` ON `t`.`id` = `v`.`transporterid`
WHERE `t`.`id` = 1;

--  call farmer_service_payment(3,101,2000,"farmer");

SELECT * FROM userroles;

SELECT * FROM goodscollectionpayments;

SELECT * FROM collectioncenters;

SELECT merchants.corporateid
FROM merchants
    INNER JOIN shipments ON merchants.id = shipments.merchantid
WHERE merchants.id = 1;

SELECT * FROM vehicles;

SELECT * FROM payments;

SELECT * FROM goodscollections;

SELECT
    shipmentitems.collectionid,
    goodscollections.quantity,
    crops.title,
    collectioncenters.corporateid
FROM shipmentitems
    INNER JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
    INNER JOIN crops ON goodscollections.cropid = crops.id
    INNER JOIN collectioncenters ON goodsCollections.collectioncenterid = collectioncenters.id
    INNER JOIN shipments ON shipments.id = shipmentitems.shipmentid
WHERE shipments.id = 1;

SELECT * FROM transporterpayments;

select count(shipmentid)
from transporterpayments
WHERE shipmentid = 1;

SELECT EXISTS (
        select shipmentid
        from transporterpayments
        WHERE shipmentid = 1
    );

SELECT
    `s`.`id` AS `Id`,
    `c`.`corporateid` AS `CollectionCenterCorporaterId`,
    `g`.`farmerid` AS `FarmerId`,
    `c0`.`title` AS `CropName`,
    `v`.`grade` AS `Grade`,
    `g`.`containertype` AS `ContainerType`,
    `g`.`quantity` AS `Quantity`,
    `g`.`weight` AS `TotalWeight`,
    `v`.`weight` AS `NetWeight`,
    `g`.`collectiondate` AS `CollectionDate`
FROM
    `shipmentitems` AS `s`
    INNER JOIN `shipments` AS `a` ON `s`.`shipmentid` = `a`.`id`
    INNER JOIN `goodscollections` AS `g` ON `s`.`collectionid` = `g`.`id`
    INNER JOIN `collectioncenters` AS `c` ON `g`.`collectioncenterid` = `c`.`id`
    INNER JOIN `verifiedgoodscollection` AS `v` ON `g`.`id` = `v`.`collectionid`
    INNER JOIN `crops` AS `c0` ON `g`.`cropid` = `c0`.`id`
WHERE `a`.`id` = 8;

show Type from verifiedgoodscollection WHERE field='grade';

SELECT SUBSTRING(COLUMN_TYPE, 5) As grades
FROM information_schema.COLUMNS
WHERE
    TABLE_SCHEMA = 'eagroservicesdb'
    AND TABLE_NAME = 'verifiedgoodscollection'
    AND COLUMN_NAME = 'grade';

    SELECT SUBSTRING(COLUMN_TYPE, 5) As grades
FROM information_schema.COLUMNS
WHERE
    TABLE_SCHEMA = 'eagroservicesdb'
    AND TABLE_NAME = 'goodscollections'
    AND COLUMN_NAME = 'containertype';
SELECT *
FROM shipments;

SELECT `t`.`id`
FROM
    `transporters` AS `t`
WHERE `t`.`managerid` = 3;

SELECT
    `s`.`id` AS `Id`,
    `c`.`corporateid` AS `CollectionCenterCorporaterId`,
    `g`.`farmerid` AS `FarmerId`,
    `c0`.`title` AS `CropName`,
    `v`.`grade` AS `Grade`,
    `g`.`containertype` AS `ContainerType`,
    `g`.`quantity` AS `Quantity`,
    `g`.`weight` AS `TotalWeight`,
    `v`.`weight` AS `NetWeight`,
    `g`.`collectiondate` AS `CollectionDate`
FROM
    `shipmentitems` AS `s`
    INNER JOIN `goodscollections` AS `g` ON `s`.`collectionid` = `g`.`id`
    INNER JOIN `collectioncenters` AS `c` ON `g`.`collectioncenterid` = `c`.`id`
    INNER JOIN `verifiedgoodscollection` AS `v` ON `g`.`id` = `v`.`collectionid`
    INNER JOIN `crops` AS `c0` ON `g`.`cropid` = `c0`.`id`
WHERE
    `s`.`shipmentid` = 3;

DROP INDEX idx_containertype ON goodscollections;

SELECT * FROM goodscollections;

SELECT vehicles.vehicletype,vehicles.rtonumber,shipments.*,merchants.corporateid
FROM transporters INNER JOIN vehicles
ON transporters.id=vehicles.transporterid
INNER JOIN shipments 
ON vehicles.id= shipments.vehicleid
 INNER JOIN merchants
 ON merchants.id=shipments.merchantid
WHERE transporters.id=1;
SELECT goodscollections.*
FROM goodscollections
    LEFT JOIN verifiedgoodscollection ON goodscollections.id = verifiedgoodscollection.collectionid
WHERE
    verifiedgoodscollection.collectionid IS NULL;

LEFT JOIN verifiedgoodscollection ON goodscollections.id = verifiedgoodscollection.collectionid
WHERE verifiedgoodscollection.collectionid IS NULL;


SELECT * FROM verifiedgoodscollection;
SELECT * FROM goodscollections;


SELECT * FROM shipments;
SELECT * FROM invoices;
SELECT * FROM goodscollectionpayments;
SELECT * FROM goodscosting;

SELECT * FROM payments;
SELECT * FROM goodscosting;
SELECT vehicles.rtonumber, SUM(payments.amount) AS amount
FROM transporters INNER JOIN vehicles
ON transporters.id = vehicles.transporterid
INNER JOIN shipments
ON vehicles.id=shipments.vehicleid
INNER JOIN transporterpayments
ON  shipments.id=transporterpayments.shipmentid
INNER JOIN payments
ON transporterpayments.paymentid=payments.id
WHERE transporterid=1 and YEAR(shipments.shipmentdate)=2023 GROUP BY vehicles.rtonumber,YEAR(shipments.shipmentdate);

SELECT
    YEAR(shipments.shipmentdate),
    MONTHNAME(shipments.shipmentdate),
    COUNT(*) 
FROM shipments
    INNER JOIN vehicles ON  shipments.vehicleid=vehicles.id
    INNER JOIN transporters ON vehicles.transporterid = transporters.id
    INNER JOIN transporterpayments ON shipments.id = transporterpayments.shipmentid
    INNER JOIN payments ON transporterpayments.paymentid = payments.id
WHERE transporters.id = 1 AND shipments.status='delivered'
GROUP BY MONTHNAME(shipments.shipmentdate),YEAR(shipments.shipmentdate) ;

SELECT EXTRACT(month FROM `s`.`shipmentdate`),SUM(payments.amount)
      FROM `shipments` AS `s`
      INNER JOIN `vehicles` AS `v` ON `s`.`vehicleid` = `v`.`id`
      INNER JOIN `transporters` AS `t` ON `v`.`transporterid` = `t`.`id`
      INNER JOIN `transporterpayments` AS `t0` ON `s`.`id` = `t0`.`shipmentid`
      INNER JOIN `payments` AS `p` ON `t0`.`paymentid` = `p`.`id`
      WHERE (`t`.`id` = 1) AND (`s`.`status` = 'delivered')
      GROUP BY EXTRACT(year FROM `s`.`shipmentdate`), EXTRACT(month FROM `s`.`shipmentdate`)
      ORDER BY EXTRACT(year FROM `s`.`shipmentdate`), EXTRACT(month FROM `s`.`shipmentdate`);



SELECT YEAR(shipments.shipmentdate) AS year FROM shipments GROUP BY YEAR(shipments.shipmentdate); 
SELECT * FROM shipments;
SELECT * FROM  collectioncenters;
SELECT * FROM transporterpayments;

SELECT * FROM vehicles;



 SELECT MONTHNAME( `s`.`shipmentdate`), COALESCE(SUM(`p`.`amount`), 0.0)
      FROM `vehicles` AS `v`
      INNER JOIN `transporters` AS `t` ON `v`.`transporterid` = `t`.`id`
      INNER JOIN `shipments` AS `s` ON `v`.`id` = `s`.`vehicleid`
      INNER JOIN `transporterpayments` AS `t0` ON `s`.`id` = `t0`.`shipmentid`
      INNER JOIN `payments` AS `p` ON `t0`.`paymentid` = `p`.`id`
      WHERE `t`.`id` = 1 AND YEAR(`s`.`shipmentdate`)=2022
      GROUP BY MONTHNAME(`s`.`shipmentdate`);

SELECT YEAR(shipments.shipmentdate) AS year FROM shipments 
INNER JOIN vehicles ON shipments.vehicleid=vehicles.id
WHERE vehicles.transporterid=1 GROUP BY YEAR(shipments.shipmentdate) ;
      SELECT COUNT(goodscollections.cropid),
      crops.title
      FROM goodscollections
      INNER JOIN crops 
      ON goodscollections.cropid=crops.id
      INNER JOIN shipmentitems
      ON goodscollections.id=shipmentitems.collectionid
      INNER JOIN shipments
      ON shipmentitems.shipmentid=shipments.id
      WHERE shipments.merchantid=2 GROUP BY goodscollections.cropid ;

      SELECT * FROM ;
      SELECT * FROM goodscollections;
      SELECT * FROM merchants;
SELECT * FROM shipments;
      SELECT * FROM payments;
      SELECT * FROM invoices;
      SELECT * FROM shipmentitems;
SELECT * FROM collectioncenters;

          SELECT year(invoices. invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE goodscollections. farmerid =2 
                GROUP BY year(invoices. invoicedate)
                ORDER BY year(invoices. invoicedate) ASC ;



                 SELECT QUARTER(invoices. invoicedate) AS QUARTER, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE goodscollections. farmerid =2 AND YEAR(invoices.invoicedate) = 2023
                GROUP BY QUARTER(invoices. invoicedate)
                ORDER BY QUARTER(invoices. invoicedate) ASC;

               SELECT  MONTH(invoices. invoicedate) AS Month, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE goodscollections. farmerid =@farmerId AND YEAR(invoices. invoicedate) = @year
                 GROUP BY  MONTH(invoices. invoicedate) ORDER BY MONTH(invoices. invoicedate) ASC 