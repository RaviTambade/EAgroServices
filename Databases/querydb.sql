SELECT *
FROM shippingitems
    JOIN goodscosting ON goodscosting.shippingitemid = shippingitems.id
    JOIN shipments ON shippingitems.shipmentid = shipments.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
WHERE shipments.id = 1;

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
