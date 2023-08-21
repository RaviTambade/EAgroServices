-- Active: 1682349138553@@127.0.0.1@3306@bankingdb

SELECT * FROM customers;
select * from accounts;
SELECT @transactionId;
SELECT * FROM operations;
SELECT * FROM transactions;
SELECT * FROM accounts;
CALL fundtransfer("39025546601","39025546612","MAHB0000286" ,"BARBO0000286",1000,@transactionId);

SELECT acctnumber,ifsccode from accounts 
JOIN customers ON accounts.customerid = customers.customerid
WHERE customers.usertype="corporation" AND customers.dependancyid=1;


SELECT o.operationid, a.acctnumber, o.amount, o.operationdate, o.operationmode,
       (
           SELECT SUM(
               CASE
                   WHEN o2.operationmode = 'D' THEN o2.amount
                   WHEN o2.operationmode = 'W' THEN -o2.amount
                   ELSE 0
               END
           )
           FROM operations o2
           WHERE o2.acctId = o.acctId AND (o2.operationid <= o.operationid)
       )
        AS balance
FROM operations o
JOIN accounts a ON o.acctId = a.id
WHERE a.acctnumber = '45656577687'
ORDER BY o.operationdate, o.operationid;




