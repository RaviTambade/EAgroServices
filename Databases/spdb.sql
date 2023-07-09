
CREATE PROCEDURE apply_labour_charges(IN shipment_id INT)
BEGIN
    INSERT INTO goodscosting (shipmentitemid, labourcharges)
    SELECT shipmentItems.id, (goodscollections.quantity * ratecard.amount)
    FROM shipmentItems
    JOIN goodscollections ON goodscollections.id = shipmentItems.collectionid
    JOIN ratecard ON goodscollections.containertype = ratecard.title
    WHERE shipmentItems.shipmentid = shipment_id;
END;

CREATE PROCEDURE apply_service_charges(IN shipment_id INT)
BEGIN
    UPDATE goodscosting
    JOIN shipmentItems ON goodscosting.shipmentitemid = shipmentItems.id
    JOIN verifiedgoodscollection ON shipmentItems.collectionid = verifiedgoodscollection.collectionid
    JOIN ratecard ON ratecard.title = "servicecharges"
    SET goodscosting.servicecharges = verifiedgoodscollection.weight * ratecard.amount
    WHERE shipmentItems.shipmentid= shipment_id;
END;

CREATE PROCEDURE apply_total_freight_charges(IN shipment_id INT, OUT total_freight_charges DOUBLE)
BEGIN
    SELECT (shipments.kilometers * ratecard.amount) INTO total_freight_charges
    FROM shipments
    INNER JOIN vehicles ON shipments.vehicleid = vehicles.id
    INNER JOIN ratecard ON vehicles.vehicletype = ratecard.title
    WHERE shipments.id = shipment_id;
END;


CREATE PROCEDURE apply_freight_charges_for_collection(IN shipment_id INT)
BEGIN
    DECLARE totalfreightcharges DOUBLE DEFAULT 0;
    DECLARE total_collections_weight DOUBLE DEFAULT 0;
    DECLARE freight_rate_per_kg DOUBLE DEFAULT 0;
    
    CALL apply_total_freight_charges(shipment_id, @total_freight_charges);
    SELECT @total_freight_charges INTO totalfreightcharges;
    
    SELECT SUM(weight) INTO total_collections_weight
    FROM verifiedgoodscollection
    INNER JOIN shipmentItems ON verifiedgoodscollection.collectionid = shipmentItems.collectionid
    WHERE shipmentItems.shipmentid = shipment_id;
    
    SET freight_rate_per_kg = totalfreightcharges / total_collections_weight;
    
    UPDATE goodscosting
    INNER JOIN shipmentItems ON goodscosting.shipmentitemid = shipmentItems.id
    INNER JOIN verifiedgoodscollection ON shipmentItems.collectionid = verifiedgoodscollection.collectionid
    SET goodscosting.freightcharges = freight_rate_per_kg * verifiedgoodscollection.weight
    WHERE shipmentItems.shipmentid = shipment_id;
END;



CREATE PROCEDURE calculate_total_amount(IN shipment_Item_id INT)
BEGIN
	DECLARE collection_weight DOUBLE DEFAULT 0;
	DECLARE rate_per_kg DOUBLE DEFAULT 0;
	DECLARE amount DOUBLE DEFAULT 0;
	DECLARE total_charges DOUBLE DEFAULT 0;

    SELECT weight INTO collection_weight FROM verifiedgoodscollection
    INNER JOIN shipmentItems ON verifiedgoodscollection.collectionid = shipmentItems.collectionid
    WHERE shipmentItems.id = shipment_Item_id;

	SELECT (labourcharges+servicecharges+freightcharges) INTO total_charges FROM goodscosting WHERE shipmentitemid=shipment_Item_id; 

	SELECT rateperkg INTO rate_per_kg FROM invoices WHERE shipmentitemid=shipment_Item_id;
    SET amount=(collection_weight*rate_per_kg) - total_charges ;

	UPDATE invoices SET totalamount=amount WHERE shipmentitemid=shipment_Item_id;
END;

