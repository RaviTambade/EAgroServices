
-- Active: 1682349138553@@127.0.0.1@3306@eagroservicesdb
    SELECT * FROM shipmentitems    
    JOIN goodscosting ON goodscosting.shippingitemid = shipmentitems.id
	JOIN shipments ON shipmentitems.shipmentid=shipments.id
    JOIN verifiedgoodscollection ON shipmentitems.collectionid = verifiedgoodscollection.collectionid
    WHERE shipments.id=1;

    SELECT * FROM vehicles INNER JOIN transporters ON vehicles.transporterid=transporters.id WHERE transporters.id=2;
     SELECT 1
      FROM `transporters` AS `t`
      INNER JOIN `vehicles` AS `v` ON `t`.`id` = `v`.`transporterid`
      WHERE `t`.`id` = 1;


      SELECT shipments.kilometers,shipments.shipmentdate
      FROM vehicles INNER JOIN shipments
      ON vehicles.id=shipments.vehicleid 
      WHERE shipments.vehicleid=2 GROUP BY shipments.id;

SELECT * FROM shipments WHERE id=1;

 SELECT `s`.`id`, `s`.`kilometers`, `s`.`merchantid`, `s`.`shipmentdate`, `s`.`status`, `s`.`vehicleid`
      FROM `shipments` AS `s`
      WHERE `s`.`vehicleid` =1;
SELECT *
FROM shippingitems
    JOIN goodscosting ON goodscosting.shippingitemid = shippingitems.id
    JOIN shipments ON shippingitems.shipmentid = shipments.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
WHERE shipments.id = 1;
SELECT * FROM userroles;
SELECT shipments.id,vehicles.rtonumber,kilometers,status,shipmentdate,
    apply_total_freight_charges(shipments.id) AS freightcharges
FROM shipments
    INNER JOIN vehicles ON shipments.vehicleid = vehicles.id
    WHERE shipments.merchantid=1;

SELECT * FROM vehicles INNER JOIN transporters ON vehicles.transporterid=transporters.id WHERE transporters.id=2;
SELECT 1
FROM `transporters` AS `t`
INNER JOIN `vehicles` AS `v` ON `t`.`id` = `v`.`transporterid`
WHERE `t`.`id` = 1;


--  call farmer_service_payment(3,101,2000,"farmer");

 SELECT * FROM userroles;
 SELECT * FROM goodscollectionpayments;
 SELECT * FROM collectioncenters;
SELECT merchants.corporateid FROM merchants INNER JOIN shipments ON merchants.id=shipments.merchantid WHERE merchants.id=1;
SELECT * FROM vehicles;
SELECT * FROM payments;
SELECT * FROM goodscollections;

SELECT shipmentitems.collectionid,goodscollections.quantity,crops.title,collectioncenters.corporateid
FROM shipmentitems INNER JOIN goodscollections
ON shipmentitems.collectionid=goodscollections.id
INNER JOIN crops ON goodscollections.cropid=crops.id
INNER JOIN collectioncenters ON goodsCollections.collectioncenterid=collectioncenters.id
INNER JOIN shipments ON shipments.id=shipmentitems.shipmentid
WHERE shipments.id=1;
SELECT * FROM transporterpayments;

select count(shipmentid)   from transporterpayments WHERE shipmentid=1;

SELECT EXISTS (select shipmentid   from transporterpayments WHERE shipmentid=1);


DROP INDEX idx_containertype ON goodscollections;
SELECT * FROM goodscollections;

SELECT goodscollections.*
FROM goodscollections
LEFT JOIN verifiedgoodscollection ON goodscollections.id = verifiedgoodscollection.collectionid
WHERE verifiedgoodscollection.collectionid IS NULL;