<h3 align="center">FarmerAPI </h3>


URL

```console
 http://localhost:5051/api/farmerscollections/verified/{farmerId}/{paymentStatus}
 api/collections/farmers/{farmerId}/verifiedstatus/{paymentStatus}
```

Method = GET

Description = Get the all verifiedcollections with paymentstatus

Body = None

Response = 

```console
[
  {
    "id": 1,
    "collectionCenterId": 1,
    "corporateId": 1,
    "managerId": 1,
    "cropName": "Tomato",
    "imageUrl": "/assets/images/tomato.jpeg",
    "containerType": "crates",
    "quantity": 25,
    "weight": 550,
    "collectionDate": "2023-09-01T13:30:00",
    "grade": "A",
    "paymentStatus": "paid",
    "verifiedWeight": 520,
    "inspectionDate": "2023-09-01T13:30:00"
  }
]
```

Token requird = No

<hr>

URL

```console
 http://localhost:5051/api/farmerscollections/verifiedcollection/{farmerId}
```


Method = GET

Description = Gets the all verified Collection

Body = None

Response = 

```console
 [
  {
    "id": 1,
    "collectionCenterId": 1,
    "corporateId": 1,
    "managerId": 1,
    "cropName": "Tomato",
    "imageUrl": "/assets/images/tomato.jpeg",
    "containerType": "crates",
    "quantity": 25,
    "weight": 550,
    "collectionDate": "2023-09-01T13:30:00",
    "grade": "A",
    "paymentStatus": "paid",
    "verifiedWeight": 520,
    "inspectionDate": "2023-09-01T13:30:00"
  },
]
```

Token requird = No


<hr>

URL

```console
 http://localhost:5051/api/farmerscollections/{farmerId}"
```

Method = Get

Description = Get all collections of farmers

Body = None

Response = 

```console
  [
  {
    "id": 1,
    "collectionCenterId": 1,
    "corporateId": 1,
    "managerId": 1,
    "cropName": "Tomato",
    "imageUrl": "/assets/images/tomato.jpeg",
    "containerType": "crates",
    "quantity": 25,
    "weight": 550,
    "collectionDate": "2023-09-01T13:30:00",
    "grade": null,
    "paymentStatus": null,
    "verifiedWeight": 0,
    "inspectionDate": "0001-01-01T00:00:00"
  },
]
```

Token requird = No


<hr>

URL 
```console
http://localhost:5051/api/farmerscollections/collectionlist/{farmerId}
```
Method = GET

Description =  collectionlist 

Body = None

Response = 

```console
  [
  {
    "collectionId": 1,
    "cropName": "Tomato",
    "status": "Verified",
    "quantity": 25,
    "collectionDate": "2023-09-01T13:30:00"
  }
]
```

Token requird = No

<hr>

URL
```console
http://localhost:5051/api/farmerscollections/collectiondetails/{collectionId}
```

Method = GET

Description = collection Details of each farmer Collection

Body = None
Response = 

```console
 {
  "id": 4,
  "collectionCenterId": 1,
  "corporateId": 1,
  "managerId": 1,
  "cropName": "Potato",
  "imageUrl": "/assets/images/potato.jpeg",
  "containerType": "bags",
  "quantity": 150,
  "weight": 8700,
  "collectionDate": "2023-09-04T13:30:00",
  "grade": null,
  "paymentStatus": null,
  "verifiedWeight": 0,
  "inspectionDate": "0001-01-01T00:00:00"
}
```

Token requird = No

<hr>

URL
```console
http://localhost:5051/api/farmerscollections/unverifiedcollection/{farmerId}
```

Method = GET

Description = unverified collection of farmers

Body = None
Response = 

```console
 [
  {
    "id": 126,
    "collectionCenterId": 1,
    "corporateId": 1,
    "managerId": 1,
    "cropName": "Beans",
    "imageUrl": "/assets/images/beans.jpeg",
    "containerType": "polythene bags",
    "quantity": 35,
    "weight": 2110,
    "collectionDate": "2023-11-01T13:30:00",
    "grade": null,
    "paymentStatus": null,
    "verifiedWeight": 0,
    "inspectionDate": "0001-01-01T00:00:00"
  }
 ]
```

Token requird = No

<hr>


URL
```console
http://localhost:5051/api/farmerscollections/croprevenue/{farmerId}
```

Method = GET

Description = crop wise revenue of farmer

Body = None

Response = 

```console
 
 [
    {
    "cropName": "Beans",
    "totalAmount": 0
  },
  {
    "cropName": "Brinjal",
    "totalAmount": 0
  },
  {
    "cropName": "Cabbage",
    "totalAmount": 0
  },
  {
    "cropName": "Onion",
    "totalAmount": 5000
  },
  {
    "cropName": "Potato",
    "totalAmount": 0
  },
  {
    "cropName": "soyabean",
    "totalAmount": 0
  },
  {
    "cropName": "Tomato",
    "totalAmount": 17050
  },
  {
    "cropName": "wheat",
    "totalAmount": 0
  }
 ]
```

Token requird = No

<hr>


<h3 align="center">MerchantsAPI </h3>


URL
```console
http://localhost:5276/api/merchants
```
Method = GET

Description = Gets the all Merchants

Body = None

Response = 

```console
[
  {
    "id": 1,
    "corporateId": 7,
    "managerId": 10
  },
  {
    "id": 2,
    "corporateId": 8,
    "managerId": 11
  },
  {
    "id": 3,
    "corporateId": 9,
    "managerId": 12
  }
]
```

Token requird = No


<hr>

URL
```console
 http://localhost:5276/api/merchants/{merchantid}
```

Method = GET

Description = Get merchant by its id

Body = None

Response = 

```console
  {
    "id": 1,
    "corporateId": 7,
    "managerId": 10
  }
```

Token requird = No

<hr>

URL
```console
http://localhost:5276/api/merchants
```
Method = POST
Description = Insert new Merchant

Body
```console
 {
    "id": 1,
    "corporateId": 7,
    "managerId": 10
  }
```
Token requird = No

<hr>

URL
```console
http://localhost:5276/api/merchants/{id}
```
Id = merchantId

Method = PUT

Description = Update an existing Merchant Data

Body
```console
 {
    "id": 1,
    "corporateId": 7,
    "managerId": 10
  }
```
Token requird = No

<hr>

URL
```console
 http://localhost:5276/api/merchants/merchants/{id}
```

Method = DELETE

Description = Delete an existing Merchant Data

Body =  None

Token requird = No

<hr>


URL
```console
 http://localhost:5276/api/merchants/{merchantId}/getcorporate
```

Method = GET

Description = Get Corporate Id by merchant Id

Body =  None

responce = 7


Token requird = No

<hr>


URL
```console
 http://localhost:5276/api/merchants/manager/{managerId}
```

Method = GET

Description = Get merchant Id by managerId

Body =  None

Token requird = No

<hr>


URL
```console
 http://localhost:5276/api/merchants/merchantandcorporateid
```

Method = GET

Description = Get Corporate Id of all merchants

Body =  None

responce = 

```console
[
  {
    "id": 1,
    "corporateId": 7
  },
  {
    "id": 2,
    "corporateId": 8
  },
  {
    "id": 3,
    "corporateId": 9
  }
]
```
Token requird = No

<hr>


URL
```console
 http://localhost:5276/api/merchants/id/{corporateId}
```

Method = get 

Description =  get merchant Id by corporateId

Body =  None

Token requird = No

<hr>


<h3 align="center">TransportAPI </h3>

URL

```console
http://localhost:5240/api/transports/transports
```
Method = GET

Description = Gets the all Transportors

Body = None

<hr>

URL

```console
http://localhost:5240/api/transports/transports/{id}
```
Id = transportId

Method = GET

Description = Get Transportor by its id

Body = None

<hr>

URL
```console
http://localhost:5240/api/transports/transports
```
Method = POST

Description = Insert new Transport

Body
```console
{
    "Transport": {
        "officeName": "Shubham Transport",
        "firstName": "Shubham",
        "lastName": "Teli",
        "location": "Chas"
    },
    "user": {
        "contactNumber": "7448025854",
        "password": "password"
    },
    "userRole": {
        "roleId": 1
    }
}
```
URL
```console
http://localhost:5240/api/Transports/transports/{id}
```
Id = transportId

Method = PUT

Description = Update an existing Transportor Data

Body
```console
 {
        "officeName": "Shubham Transport",
        "firstName": "Shubham",
        "lastName": "Teli",
        "location": "Chas"
    }
```
URL
```console
http://localhost:5240/api/Transports/transports/{id}
```
Id = transportId

Method = DELETE

Description = Delete an existing Transport Data

<hr>

<h3 align="center">CropAPI </h3>

URL
```console
http://localhost:5224/api/crop
```
Method = GET

Description = Gets the all Varieties

Body = None

<hr>

URL
```console
http://localhost:5224/api/crop{id}
```
Id = varietyId

Method = GET

Description = Get variety by its id

Body = None
<hr>

URL
```console
http://localhost:5224/api/crop
```
Method = POST
Description = Insert new Variety
Body
```console
  {
        "varietyName": "potato"
    }
```
URL
```console
http://localhost:5224/api/crop/{id}
```
Id = cropId

Method = PUT

Description = Update an existing Variety Data

Body
```console
{
        "varietyName": "potato"
    }
```
URL
```console
http://localhost:5224/api/variety/variety/{id}
```
Id = varietyId

Method = DELETE

Description = Delete an existing Variety Data

<hr>

 <h3 align="center">PurchaseAPI </h3>

URL
```console
http://localhost:5171/api/purchase/purchase
```
Method = GET

Description = Gets the all PurchaseItems

Body = None

<hr>

URL

```console
 http://localhost:5171/api/purchase/purchase/{id}
```
Id = purchaseId

Method = GET

Description = Get purchase Details  by its purchaseid

Body = None

<hr>

URL
```console
 http://localhost:5171/api/purchase/purchase
```
Method = POST

Description = Insert new purchasedetails

Body

```console
  {
    "purchaseItem": {
        
        "farmerId": 1,
        "varietyId": 1,
        "containerType": "bags",
        "quantity": 50,
        "grade": "A",
        "totalWeight": 2500,
        "tareWeight": 25,
        "ratePerKg": 30,
        
    }
  }
  ```

URL

```console
http://localhost:5224/api/purchase/purchase/{id}
```
Id = purchaseId

Method = PUT

Description = Update an existing purchase Data

Body
```console
  {
    "purchaseItem": {
        
        "containerType": "bags",
        "quantity": 50,
        "grade": "A",
        "totalWeight": 2500,
        "tareWeight": 25,
        "ratePerKg": 30,
        
    }
  }
  ```

URL
```console
http://localhost:5224/api/purchase/{id}
```
Id = purchaseId

Method = DELETE

Description = Delete an existing purchase Data

<hr>

 <h3 align="center">SellsAPI </h3>

URL
```console
http://localhost:5182/api/sells
```
Method = GET

Description = Gets the all Sells Details

Body = None

<hr>

URL

```console
 http://localhost:5182/api/sells/{id}
```
Id = sellId

Method = GET

Description = Get Sell Details  by its sellid

Body = None

<hr>

URL
```console
http://localhost:5182/api/sells
```
Method = POST

Description = Insert new Sell details

Body

```console
 
    {
        "sell": {
            
            " collectionId": 4,
            "merchantId": 2,
            "truckId": 1,
            "netWeight": 1000,
            "ratePerKg": 20,
            "totalAmount": 20000,
            "date": "2023-05-05T10:48:38"
        },
        "freightRate": {
            "fromDestination": "Bhavadi",
            "toDestination": "Pune",
            "kilometers": 100,
            "ratePerKm": 40,
            "billId": 1
        }
    }

  ```

URL

```console
http://localhost:5182/api/sells/{id}
```
Id = sellId

Method = PUT

Description = Update an existing sell Data

Body
```console
  {
        "sell": {
            
            "collectionId": 4,
            "merchantId": 2,
            "truckId": 1,
            "ratePerKg": 20,
            "date": "2023-05-05T10:48:38"
        },
        "freightRate": {
            "fromDestination": "Bhavadi",
            "toDestination": "Pune",
            "kilometers": 100,
            "ratePerKm": 40,
            "billId": 1
        }
    }

  ```

URL
```console
http://localhost:5182/api/sells{id}
```
Id = sellId

Method = DELETE

Description = Delete an existing sell Data

<hr>
