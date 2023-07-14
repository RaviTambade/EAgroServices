-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb
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