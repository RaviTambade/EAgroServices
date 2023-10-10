-- Active: 1696576841746@@127.0.0.1@3306


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

CREATE PROCEDURE  transporter_payment(IN shipment_id INT,IN transaction_id INT,IN amount DOUBLE )
BEGIN 
DECLARE last_payment_id INT; 

  INSERT INTO payments (transactionid, amount)VALUES ( transaction_id, amount);
    SET last_payment_id = LAST_INSERT_ID();

  INSERT INTO transporterpayments (shipmentid, paymentid)
        VALUES (shipment_id, last_payment_id);
END;



CREATE PROCEDURE call_all_procedures_for_charges(IN records INT)
BEGIN
  DECLARE i INT DEFAULT 1;
    UPDATE shipments SET status='delivered' WHERE 1=1;
  WHILE i <= records DO
    CALL call_procedures_after_shipment_status_delivered(i);
    SET i = i + 1;
  END WHILE;
END;
CREATE PROCEDURE call_all_procedures_for_totalamount(IN records INT)
BEGIN
  DECLARE i INT DEFAULT 1;
    UPDATE invoices SET rateperkg=20 WHERE 1=1;
    WHILE i <= records DO
    CALL calculate_total_amount(i);
    SET i = i + 1;
  END WHILE;
END;



-- SELECT SUM(invoices.totalamount) AS Amount
--                 FROM invoices 
--                 JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--                 JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
--                 WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid =3 AND  collectiondate >= '2023-09-02'
--   AND  collectiondate <= '2023-10-02' 
--                 GROUP BY year(invoices. invoicedate)
--                 ORDER BY year(invoices. invoicedate) ASC;
--       SELECT QUARTER(invoices. invoicedate) AS Quarter, SUM(invoices.totalamount) AS Amount
--                 FROM invoices 
--                 JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--                 JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
--                 WHERE  invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId AND YEAR(invoices.invoicedate) = @year
--                 GROUP BY QUARTER(invoices. invoicedate)
--                 ORDER BY QUARTER(invoices. invoicedate) ASC;

--                 SELECT  MONTHNAME(invoices. invoicedate) AS Month, SUM(invoices.totalamount) AS Amount
--                 FROM invoices 
--                 JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--                 JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
--                 WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId AND YEAR(invoices. invoicedate) = @year
--                  GROUP BY  MONTHNAME(invoices. invoicedate) ORDER BY MONTHNAME(invoices. invoicedate) ASC  ;         
-- Create PROCEDURE collection_deta_analysis (
--   IN mode varchar(50),
--   IN year int,
--   in farmerId int
-- )
-- BEGIN 
-- IF mode = 'monthName' THEN

--    SELECT year(invoices. invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
--                 FROM invoices 
--                 JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--                 JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
--                 WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId 
--                 GROUP BY year(invoices. invoicedate)
--                 ORDER BY year(invoices. invoicedate) ASC
-- -- CREATE PROCEDURE insertpayment(
-- --     IN mode VARCHAR(255),
-- --     IN paymentstatus VARCHAR(255),
-- --     IN transactionid INT,
-- --     IN orderid INT
-- -- )
-- -- BEGIN
-- --     IF mode = 'cash on delivery' THEN
-- --         INSERT INTO payments ( mode, paymentstatus, orderid)
-- --         VALUES ( mode, paymentstatus, orderid);
-- --     ELSEIF mode = 'net banking' THEN
-- --         INSERT INTO payments ( mode, paymentstatus, transactionid, orderid)
-- --         VALUES ( mode,paymentstatus,transactionid,orderid);
-- --     END IF;
-- -- END;
-- Create the stored procedure


-- CREATE PROCEDURE CalculateInvoiceAmounts(
--     IN farmerId INT,
--     IN year INT
-- )
-- BEGIN
--     -- Calculate the sum of invoice amounts by year
--     SELECT YEAR(invoices.invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
--     FROM invoices 
--     JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--     JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
--     WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
--     AND YEAR(invoices.invoicedate) = year
--     GROUP BY YEAR(invoices.invoicedate)
--     ORDER BY Year ASC;

--     -- Calculate the sum of invoice amounts by quarter
--     SELECT QUARTER(invoices.invoicedate) AS Quarter, SUM(invoices.totalamount) AS Amount, YEAR(invoices.invoicedate) AS Year
--     FROM invoices 
--     JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--     JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
--     WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
--     AND YEAR(invoices.invoicedate) = year
--     GROUP BY YEAR(invoices.invoicedate), Quarter
--     ORDER BY Year ASC, Quarter ASC;

--     -- Calculate the sum of invoice amounts by month
--     SELECT MONTHNAME(invoices.invoicedate) AS Month, SUM(invoices.totalamount) AS Amount, YEAR(invoices.invoicedate) AS Year
--     FROM invoices 
--     JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--     JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
--     WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
--     AND YEAR(invoices.invoicedate) = year
--     GROUP BY YEAR(invoices.invoicedate), MONTHNAME(invoices.invoicedate)
--     ORDER BY Year ASC, MONTH(invoices.invoicedate) ASC;

--     -- Calculate the sum of invoice amounts by week
--     SELECT YEAR(invoices.invoicedate) AS Year, WEEK(invoices.invoicedate) AS WeekNumber, SUM(invoices.totalamount) AS Amount
--     FROM invoices 
--     JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
--     JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
--     WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
--     AND YEAR(invoices.invoicedate) = year
--     GROUP BY YEAR(invoices.invoicedate), WeekNumber
--     ORDER BY Year ASC, WeekNumber ASC;
-- END;
CALL CalculateInvoiceAmounts(1,2023,'month');
DROP Procedure CalculateInvoiceAmounts;

CREATE PROCEDURE CalculateInvoiceAmounts(
    IN farmerId INT,
    IN year INT,
    IN mode VARCHAR(10)
)
BEGIN
IF mode = 'year' THEN
    -- Calculate the sum of invoice amounts by year
    SELECT YEAR(invoices.invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
    FROM invoices 
    JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
    JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
    WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
    AND YEAR(invoices.invoicedate) = year
    GROUP BY YEAR(invoices.invoicedate)
    ORDER BY Year ASC;
ELSEIF mode='quarter' THEN
    -- Calculate the sum of invoice amounts by quarter
    SELECT QUARTER(invoices.invoicedate) AS Quarter, SUM(invoices.totalamount) AS Amount, YEAR(invoices.invoicedate) AS Year
    FROM invoices 
    JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
    JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
    WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
    AND YEAR(invoices.invoicedate) = year
    GROUP BY YEAR(invoices.invoicedate), Quarter
    ORDER BY Year ASC, Quarter ASC;
ELSEIF mode ='month' THEN
    -- Calculate the sum of invoice amounts by month
    SELECT MONTH(invoices.invoicedate) AS Month, SUM(invoices.totalamount) AS Amount, YEAR(invoices.invoicedate) AS Year
    FROM invoices 
    JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
    JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
    WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
    AND YEAR(invoices.invoicedate) = year
    GROUP BY YEAR(invoices.invoicedate), MONTHNAME(invoices.invoicedate)
    ORDER BY Year ASC, MONTH(invoices.invoicedate) ASC;
ELSEIF mode='week' THEN
    -- Calculate the sum of invoice amounts by week
    SELECT YEAR(invoices.invoicedate) AS Year, WEEK(invoices.invoicedate) AS WeekNumber, SUM(invoices.totalamount) AS Amount
    FROM invoices 
    JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
    JOIN goodscollections ON shipmentitems.collectionid = goodscollections.id
    WHERE invoices.paymentstatus = 'paid' AND goodscollections.farmerid = farmerId
    AND YEAR(invoices.invoicedate) = year
    GROUP BY YEAR(invoices.invoicedate), WeekNumber
    ORDER BY Year ASC, WeekNumber ASC;
END IF;
End;


