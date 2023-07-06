CREATE PROCEDURE apply_labour_charges(IN shipping_item_id INT)
BEGIN
DECLARE labourcharges DOUBLE DEFAULT 0;
SELECT (goodscollections.quantity*ratecard.amount) INTO labourcharges FROM goodscollections
JOIN shippingitems ON goodscollections.id = shippingitems.collectionid
JOIN ratecard ON goodscollections.containertype = ratecard.title
WHERE shippingitems.id = shipping_item_id;

INSERT INTO goodscosting(shippingitemid,labourcharges) VALUES (shipping_item_id,labourcharges);
END;

CREATE PROCEDURE apply_service_charges(IN shipping_item_id INT)
BEGIN
    UPDATE goodscosting
    JOIN shippingitems ON goodscosting.shippingitemid = shippingitems.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
    JOIN ratecard ON ratecard.title = "servicecharges"
    SET goodscosting.servicecharges = verifiedgoodscollection.weight * ratecard.amount
    WHERE shippingitems.id = shipping_item_id;
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
	DECLARE finished INT DEFAULT 0;
	DECLARE shipping_item_id INT DEFAULT 0;
	DECLARE freight_charges DOUBLE DEFAULT 0;
	DECLARE totalfreightcharges DOUBLE DEFAULT 0;
	DECLARE collection_weight DOUBLE DEFAULT 0;
	DECLARE total_collections_weight DOUBLE DEFAULT 0;
	DECLARE freight_rate_per_kg DOUBLE DEFAULT 0;

	DECLARE cursor_shipment_item_id CURSOR FOR
	SELECT id FROM shippingitems WHERE shipmentid = shipment_id;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	CALL apply_total_freight_charges(shipment_id,@total_freight_charges);
	SELECT @total_freight_charges INTO totalfreightcharges;

	SELECT SUM(weight) INTO total_collections_weight FROM verifiedgoodscollection
	INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
	WHERE shippingitems.shipmentid = shipment_id;

	SET freight_rate_per_kg=totalfreightcharges/total_collections_weight;

	OPEN cursor_shipment_item_id;
	updatefreightcharges: LOOP
	    FETCH cursor_shipment_item_id INTO shipping_item_id;

        IF finished = 1 THEN 
            LEAVE updatefreightcharges;
        END IF;

        SELECT weight INTO collection_weight FROM verifiedgoodscollection
        INNER JOIN shippingitems ON verifiedgoodscollection.collectionid = shippingitems.collectionid
        WHERE shippingitems.id = shipping_item_id;

        SET freight_charges = freight_rate_per_kg * collection_weight;

        UPDATE goodscosting SET freightcharges = freight_charges WHERE shippingitemid = shipping_item_id;
	END LOOP updatefreightcharges;
	CLOSE cursor_shipment_item_id;
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

