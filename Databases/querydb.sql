-- Active: 1694098175290@@127.0.0.1@3306

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

SELECT * FROM verifiedgoodscollection;

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
SELECT * FROM shipmentitems;

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
      SELECT * FROM verifiedgoodscollectioncollections;
      SELECT * FROM merchants;
SELECT * FROM shipments;
SELECT * FROM crops;
      SELECT * FROM payments;
      SELECT * FROM invoices;
      SELECT * FROM shipmentitems;
      SELECT * FROM shipments;
      SELECT * FROM goodscosting;
    
      SHOW TABLES;
      SELECT * FROM verifiedgoodscollection;
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

              SELECT WEEK(invoices. invoicedate,1) AS WeekNumber, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid = @farmerId AND YEAR(invoices. invoicedate) = @year
                GROUP BY WEEK(invoices. invoicedate, 1)
                ORDER BY WEEK(invoices. invoicedate, 1);



                 SELECT 2022 AS `Year`, `c0`.`title` AS `CropName`, COALESCE(SUM(`i`.`totalamount`), 0.0) AS `TotalAmount`
      FROM `invoices` AS `i`
      INNER JOIN `shipmentitems` AS `s` ON `i`.`shipmentitemid` = `s`.`id`
      INNER JOIN `goodscollections` AS `g` ON `s`.`collectionid` = `g`.`id`
      INNER JOIN `collectioncenters` AS `c` ON `g`.`collectioncenterid` = `c`.`id`     
      INNER JOIN `verifiedgoodscollection` AS `v` ON `g`.`id` = `v`.`collectionid`     
      INNER JOIN `crops` AS `c0` ON `g`.`cropid` = `c0`.`id`
      WHERE ((`g`.`farmerid` = 2) AND (`i`.`paymentstatus` = 'paid')) AND (EXTRACT(year FROM `i`.`invoicedate`) =2022)
      GROUP BY `c0`.`title`
      ORDER BY `c0`.`title`;



       SELECT `g`.`id` AS `Id`, `c0`.`title` AS `CropName`, `c0`.`imageurl` AS `ImageUrl`, `g`.`collectioncenterid` AS `CollectionCenterId`, `c`.`corporateid` AS `CorporateId`, `g`.`quantity` AS `Quantity`, `g`.`containertype` AS `ContainerType`, `g`.`weight` AS `Weight`, `g`.`collectiondate` AS `CollectionDate`
      FROM `goodscollections` AS `g`
      INNER JOIN `collectioncenters` AS `c` ON `g`.`collectioncenterid` = `c`.`id`   
      INNER JOIN `crops` AS `c0` ON `g`.`cropid` = `c0`.`id`
      LEFT JOIN `verifiedgoodscollection` AS `v` ON `g`.`id` = `v`.`collectionid`    
      WHERE `v`.`id` IS NULL AND (`g`.`farmerid` =2)

      SELECT * from verifiedgoodscollection WHERE collectionid=3;

       SELECT `m`.`corporateid` AS `MerchantCorporateId`, `c`.`corporateid` AS `CollectionCenterCorporateId`, `t`.`corporateid` AS `TransporterCorporateId`, `v`.`rtonumber` 
AS `VehicleNumber`, `c0`.`title` AS `CropName`, `v0`.`grade` AS `Grade`, `g0`.`containertype` AS `ContainerType`, `g0`.`quantity` AS `Quantity`, `g0`.`weight` AS `TotalWeight`, `v0`.`weight` AS `NetWeight`, `g`.`freightcharges` AS `FreightCharges`, `g`.`labourcharges` AS `LabourCharges`, `i`.`paymentstatus` AS `PaymentStatus`, `g`.`servicecharges` AS `ServiceCharges`, `i`.`rateperkg` AS `RatePerKg`, `i`.`totalamount` AS `FarmerAmount`, `i`.`invoicedate` AS `InvoiceDate`
      FROM `invoices` AS `i`
      INNER JOIN `shipmentitems` AS `s` ON `i`.`shipmentitemid` = `s`.`id`
      INNER JOIN `goodscosting` AS `g` ON `s`.`id` = `g`.`shipmentitemid`
      INNER JOIN `shipments` AS `s0` ON `s`.`shipmentid` = `s0`.`id`
      INNER JOIN `vehicles` AS `v` ON `s0`.`vehicleid` = `v`.`id`
      INNER JOIN `transporters` AS `t` ON `v`.`transporterid` = `t`.`id`
      INNER JOIN `goodscollections` AS `g0` ON `s`.`collectionid` = `g0`.`id`
      INNER JOIN `collectioncenters` AS `c` ON `g0`.`collectioncenterid` = `c`.`id`   
      INNER JOIN `verifiedgoodscollection` AS `v0` ON `g0`.`id` = `v0`.`collectionid` 
      INNER JOIN `crops` AS `c0` ON `g0`.`cropid` = `c0`.`id`
      INNER JOIN `merchants` AS `m` ON `s0`.`merchantid` = `m`.`id`
      WHERE `s`.`collectionid` =9;
      SELECT * FROM transporters;
SELECT * FROM userroles;

SELECT * FROM shipments;
SELECT * FROM shipmentitems;
SELECT * FROM transporters;
SELECT * FROM collectioncenters;
SELECT * FROM merchants;

SELECT shipments.merchantid,apply_total_freight_charges(shipments.id)
FROM transporters 
INNER JOIN vehicles 
ON transporters.id=vehicles.transporterid
INNER JOIN shipments
join transporterpayments
ON shipments.id =transporterpayments.shipmentid 
ON vehicles.id=shipments.vehicleid
WHERE transporters.id=1 ;


select apply_total_freight_charges(1);

SELECT * FROM goodscollectionpayments;

  SELECT  MONTHNAME(shipments.shipmentdate) AS month,
                        collectioncenters.corporateid AS corporateid, 
                        COUNT(*) AS count
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =2 AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=2023 AND MONTHNAME(shipments.shipmentdate)='January'
                   GROUP BY collectioncenters.corporateid,MONTHNAME(shipments.shipmentdate) ORDER BY MONTHNAME(shipments.shipmentdate) ASC



     SELECT `g`.`id` AS `Id`, `g`.`farmerid` AS `FarmerId`, `c`.`title` AS `CropName`, `g`.`containertype` AS `ContainerType`, `g`.`quantity` AS `Quantity`, `v`.`grade` AS `Grade`, `g`.`weight` AS `TotalWeight`, `v`.`weight` AS `NetWeight`, `i`.`userid` AS `InspectorId`, `g`.`collectiondate` AS `CollectionDate`     
      FROM `goodscollections` AS `g`
      INNER JOIN `crops` AS `c` ON `g`.`cropid` = `c`.`id`
      INNER JOIN `verifiedgoodscollection` AS `v` ON `g`.`id` = `v`.`collectionid`
      INNER JOIN `inspectors` AS `i` ON `v`.`inspectorid` = `i`.`id`
      LEFT JOIN `shipmentitems` AS `s` ON `g`.`id` = `s`.`collectionid`
      WHERE `s`.`id` IS NULL AND (`v`.`collectionid` = 65)


      SELECT * FROM verifiedgoodscollection ;