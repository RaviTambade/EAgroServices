    SELECT * FROM shippingitems    
    JOIN goodscosting ON goodscosting.shippingitemid = shippingitems.id
	JOIN shipments ON shippingitems.shipmentid=shipments.id
    JOIN verifiedgoodscollection ON shippingitems.collectionid = verifiedgoodscollection.collectionid
    WHERE shipments.id=1