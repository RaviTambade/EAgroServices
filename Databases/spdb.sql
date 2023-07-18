-- Active: 1676969830187@@127.0.0.1@3306@eagroservicesdb

CREATE PROCEDURE apply_labour_charges(IN shipment_id INT)
BEGIN
    INSERT INTO goodscosting (shipmentitemid, labourcharges)
    SELECT shipmentitems.id, (goodscollections.quantity * ratecard.amount)
    FROM shipmentitems
    JOIN goodscollections ON goodscollections.id = shipmentitems.collectionid
    JOIN ratecard ON goodscollections.containertype = ratecard.title
    WHERE shipmentitems.shipmentid = shipment_id;
END;

CREATE PROCEDURE apply_service_charges(IN shipment_id INT)
BEGIN
    UPDATE goodscosting
    JOIN shipmentitems ON goodscosting.shipmentitemid = shipmentitems.id
    JOIN verifiedgoodscollection ON shipmentitems.collectionid = verifiedgoodscollection.collectionid
    JOIN ratecard ON ratecard.title = "servicecharges"
    SET goodscosting.servicecharges = verifiedgoodscollection.weight * ratecard.amount
    WHERE shipmentitems.shipmentid= shipment_id;
END;

CREATE FUNCTION apply_total_freight_charges(shipment_id INT) RETURNS DOUBLE
READS SQL DATA
BEGIN
    DECLARE total_freight_charges DOUBLE;
    SELECT (shipments.kilometers * ratecard.amount) INTO total_freight_charges
    FROM shipments 
    INNER JOIN vehicles  ON shipments.vehicleid = vehicles.id
    INNER JOIN ratecard  ON vehicles.vehicletype = ratecard.title
    WHERE shipments.id = shipment_id;
    RETURN total_freight_charges;
END;

CREATE PROCEDURE apply_freight_charges_for_collection(IN shipment_id INT)
BEGIN
    DECLARE totalfreightcharges DOUBLE DEFAULT 0;
    DECLARE total_collections_weight DOUBLE DEFAULT 0;
    DECLARE freight_rate_per_kg DOUBLE DEFAULT 0;
    
    SELECT apply_total_freight_charges(shipment_id) INTO totalfreightcharges;

    SELECT SUM(weight) INTO total_collections_weight
    FROM verifiedgoodscollection
    INNER JOIN shipmentitems ON verifiedgoodscollection.collectionid = shipmentitems.collectionid
    WHERE shipmentitems.shipmentid = shipment_id;
    
    SET freight_rate_per_kg = totalfreightcharges / total_collections_weight;
    
    UPDATE goodscosting
    INNER JOIN shipmentitems ON goodscosting.shipmentitemid = shipmentitems.id
    INNER JOIN verifiedgoodscollection ON shipmentitems.collectionid = verifiedgoodscollection.collectionid
    SET goodscosting.freightcharges = freight_rate_per_kg * verifiedgoodscollection.weight
    WHERE shipmentitems.shipmentid = shipment_id;
END;


CREATE PROCEDURE calculate_total_amount(IN invoice_id INT)
BEGIN
	DECLARE collection_weight DOUBLE DEFAULT 0;
	DECLARE shipment_Item_id INT DEFAULT 0;
	DECLARE rate_per_kg DOUBLE DEFAULT 0;
	DECLARE amount DOUBLE DEFAULT 0;
	DECLARE total_charges DOUBLE DEFAULT 0;

    SELECT shipmentitemid INTO shipment_Item_id FROM invoices WHERE id=invoice_id;

    SELECT weight INTO collection_weight FROM verifiedgoodscollection
    INNER JOIN shipmentitems ON verifiedgoodscollection.collectionid = shipmentitems.collectionid
    WHERE shipmentitems.id = shipment_Item_id;

	SELECT (labourcharges+servicecharges+freightcharges) INTO total_charges FROM goodscosting WHERE shipmentitemid=shipment_Item_id; 

	SELECT rateperkg INTO rate_per_kg FROM invoices WHERE shipmentitemid=shipment_Item_id;
    SET amount=(collection_weight*rate_per_kg) - total_charges ;

	UPDATE invoices SET totalamount=amount WHERE id=invoice_id;
END;


CREATE PROCEDURE add_shipment_for_billing(IN shipment_id INT)
BEGIN
INSERT INTO invoices (shipmentitemid) SELECT  shipmentitems.id FROM shipmentitems 
WHERE shipmentitems.shipmentid=shipment_id;
END;

CREATE PROCEDURE call_procedures_after_shipment_status_delivered (IN shipment_id INT)
BEGIN
CALL apply_labour_charges(shipment_id);
CALL apply_service_charges(shipment_id);
CALL apply_freight_charges_for_collection(shipment_id);
CALL add_shipment_for_billing(shipment_id);
END;
CREATE PROCEDURE  farmer_service_payment(IN collection_id INT,IN transaction_id INT,
                                    IN amount DOUBLE,IN payment_for varchar(20) )
BEGIN 
DECLARE last_payment_id INT; 
DECLARE invoice_id INT;

SELECT invoices.id INTO invoice_id FROM invoices
 INNER JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
 WHERE shipmentitems.collectionid=collection_id;

    INSERT INTO payments (transactionid, amount)VALUES ( transaction_id, amount);
    SET last_payment_id = LAST_INSERT_ID();

    IF payment_for = 'farmer' THEN
        INSERT INTO goodscollectionpayments (collectionid, paymentid)
        VALUES (collection_id, last_payment_id);
        UPDATE invoices SET paymentstatus='paid' WHERE id=invoice_id;
    END IF;

    IF  payment_for = 'serviceowner' THEN
        INSERT INTO goodsservicespayments (collectionid, paymentid)
        VALUES (collection_id, last_payment_id);
    END IF;
END;