
CREATE PROCEDURE apply_labour_charges(IN shipment_id INT)
BEGIN
    INSERT INTO goodscosting (shippingitemid, labourcharges)
    SELECT shippingitems.id, (goodscollections.quantity * ratecard.amount)
    FROM shippingitems
    JOIN goodscollections ON goodscollections.id = shippingitems.collectionid
    JOIN ratecard ON goodscollections.containertype = ratecard.title
    WHERE shippingitems.shipmentid = shipment_id;
END;

CREATE PROCEDURE apply_service_charges(IN shipment_id INT)
BEGIN
    UPDATE goodscosting
    JOIN shippingitems ON goodscosting.shippingitemid = shippingitems.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
    JOIN ratecard ON ratecard.title = "servicecharges"
    SET goodscosting.servicecharges = verifiedgoodscollection.weight * ratecard.amount
    WHERE shippingitems.shipmentid= shipment_id;
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
    INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
    WHERE shippingitems.shipmentid = shipment_id;
    
    SET freight_rate_per_kg = totalfreightcharges / total_collections_weight;
    
    UPDATE goodscosting
    INNER JOIN shippingitems ON goodscosting.shippingitemid = shippingitems.id
    INNER JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
    SET goodscosting.freightcharges = freight_rate_per_kg * verifiedgoodscollection.weight
    WHERE shippingitems.shipmentid = shipment_id;
END;



CREATE PROCEDURE calculate_total_amount(IN shipping_item_id INT)
BEGIN
	DECLARE collection_weight DOUBLE DEFAULT 0;
	DECLARE rateperkg DOUBLE DEFAULT 0;
	DECLARE amount DOUBLE DEFAULT 0;
	DECLARE total_charges DOUBLE DEFAULT 0;

    SELECT weight INTO collection_weight FROM verifiedgoodscollection
    INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
    WHERE shippingitems.id = shipping_item_id;

	SELECT (labourcharges+servicecharges+freightcharges) INTO total_charges FROM goodscosting WHERE shippingitemid=shipping_item_id; 

	SELECT rate INTO rateperkg FROM invoices WHERE shippingitemid=shipping_item_id;
    SET amount=(collection_weight*rateperkg) - total_charges ;

	UPDATE invoices SET totalamount=amount WHERE shippingitemid=shipping_item_id;
END;

