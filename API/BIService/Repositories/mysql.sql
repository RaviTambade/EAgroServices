-- Active: 1682349138553@@127.0.0.1@3306@eagroservicesdb
DELIMITER //
CREATE PROCEDURE GetRevenuesByType(IN centerId INT, IN revenueType VARCHAR(50), IN forYear INT)
BEGIN
    IF revenueType = 'Yearly' THEN
        SELECT year(payments.Date) AS Year, SUM(payments.Amount) AS Amount
        FROM goodsservicespayments 
        JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
        JOIN payments  ON goodsservicespayments.paymentid = payments.id
        WHERE goodscollections.collectioncenterid = centerId
        GROUP BY year(payments.Date)
        ORDER BY year(payments.Date) ASC;
    ELSEIF revenueType = 'Quarterly' THEN
        SELECT QUARTER(payments.Date) AS quarter,  SUM(payments.Amount) AS Amount
        FROM goodsservicespayments 
        JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
        JOIN payments ON goodsservicespayments.paymentid = payments.id
        WHERE goodscollections.collectioncenterid = centerId AND YEAR(payments.Date) = forYear
        GROUP BY QUARTER(payments.Date)
        ORDER BY  QUARTER(payments.Date) ASC;
    ELSEIF revenueType = 'Monthly' THEN
        SELECT  MONTHNAME(payments.Date) AS Month, SUM(payments.Amount) AS Amount
        FROM goodsservicespayments 
        JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
        JOIN payments ON goodsservicespayments.paymentid = payments.id
        WHERE goodscollections.collectioncenterid = centerId AND YEAR(payments.Date) = forYear
        GROUP BY  MONTH(payments.Date) ORDER BY MONTH(payments.Date) ASC ;
    ELSEIF revenueType = 'Weekly' THEN
        SELECT WEEK(payments.Date, 1) AS WeekNumber, SUM(payments.Amount) AS Amount
        FROM goodsservicespayments 
        JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
        JOIN payments ON goodsservicespayments.paymentid = payments.id
        WHERE goodscollections.collectioncenterid = centerId AND YEAR(payments.Date) = forYear
        GROUP BY WEEK(payments.Date, 1)
        ORDER BY WEEK(payments.Date, 1);
   
    END IF;
END //
DELIMITER ;
DROP PROCEDURE GetRevenuesByType; 
CALL GetRevenuesByType(1,'Yearly',2023);

SELECT 
    QUARTER(payments.Date) AS quarter, 
    SUM(payments.Amount) AS Amount
FROM goodsservicespayments 
JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
JOIN payments ON goodsservicespayments.paymentid = payments.id
WHERE goodscollections.collectioncenterid = 1 AND YEAR(payments.Date) = 2023
GROUP BY QUARTER(payments.Date)