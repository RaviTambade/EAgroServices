

## REST API EndPoints
### Collection API

  - <b>URL</b> : http://localhost:5051/api/farmerscollections/verified/{farmerId}/{paymentStatus}
  - api/collections/farmers/{farmerId}/verifiedstatus/{paymentStatus}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the all verfied collections belong to farmerid  and paymentstatus is paid or unpaid
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
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

  - <b>URL</b> : http://localhost:5051/api/farmerscollections/verifiedcollection/{farmerId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the all verified Collection of farmer belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
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

  - <b>URL</b> : http://localhost:5051/api/farmerscollections/{farmerId}"
  - <b>Method</b>: GET
  - <b>Description</b>: Get the all Collection of farmer belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
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
              }
            ]
            ```
        
  - <b>URL</b> :http://localhost:5051/api/farmerscollections/collectionlist/{farmerId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the CollectionList of farmer belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
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
         

  - <b>URL</b> :http://localhost:5051/api/farmerscollections/collectiondetails/{collectionId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the Collection Details of farmer belongs to collectionId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
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

  - <b>URL</b> :http://localhost:5051/api/farmerscollections/unverifiedcollection/{farmerId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the unverified Collections of farmer belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 
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
             

- <b>URL</b> :http://localhost:5051/api/farmerscollections/croprevenue/{farmerId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get the crop wise revenue of farmer belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 
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

### Merchant API

 - <b>URL</b> :http://localhost:5276/api/merchants
  - <b>Method</b>: GET
  - <b>Description</b>: Gets the all Merchants
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 
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

- <b>URL</b> : http://localhost:5276/api/merchants/{merchantid}
  - <b>Method</b>: GET
  - <b>Description</b>: Get merchant by its id belongs to merchantId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 

        ```console
          {
            "id": 1,
            "corporateId": 7,
            "managerId": 10
          }
        ```

<hr>
- <b>URL</b> :http://localhost:5276/api/merchants
  - <b>Method</b>: POST
  - <b>Description</b>: Add new Merchant
  - <b>Body</b>: 
          ```console
        {
            "id": 1,
            "corporateId": 7,
            "managerId": 10
          }
        ```
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 200 Ok


<hr>
- <b>URL</b> :http://localhost:5276/api/merchants/{merchantId}
  - <b>Method</b>: PUT
  - <b>Description</b>:  Update an existing Merchant Data belongs to merchantId
        - <b>Body</b>: Not requried
        ```console
      {
          "id": 1,
          "corporateId": 7,
          "managerId": 10
        }
      ```
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 200 ok


<hr>
  - <b>URL</b> : http://localhost:5276/api/merchants/merchants/{merchantId}
  - <b>Method</b>:DELETE
  - <b>Description</b>: Delete an existing Merchant Data belongs to farmerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 


<hr>
- <b>URL</b> :http://localhost:5276/api/merchants/{merchantId}/getcorporate
  - <b>Method</b>: GET
  - <b>Description</b>: Get Corporate Id by merchant Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 



<hr>
- <b>URL</b> : http://localhost:5276/api/merchants/manager/{managerId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get merchant Id by managerId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 


- <b>URL</b> : http://localhost:5276/api/merchants/merchantandcorporateid
  - <b>Method</b>: GET
  - <b>Description</b>: Get Corporate Id of all merchants
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 

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

<hr>

- <b>URL</b> : http://localhost:5276/api/merchants/id/{corporateId}
  - <b>Method</b>: GET
  - <b>Description</b>: get merchant Id by corporateId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 
  
### Transport API

  - <b>URL</b> : http://localhost:5240/api/transports
  - <b>Method</b>: GET
  - <b>Description</b>: get all transports
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
      ```console
      [
      {
        "id": 1,
        "corporateId": 4,
        "managerId": 7
      },
      {
        "id": 2,
        "corporateId": 5,
        "managerId": 8
      },
      {
        "id": 3,
        "corporateId": 6,
        "managerId": 9
      }
    ]
``

  - <b>URL</b> : http://localhost:5240/api/transports/transports/{transportId}
  - <b>Method</b>: GET
  - <b>Description</b>: get Transports by transportId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 
```console
  {
    "id": 1,
    "corporateId": 4,
    "managerId": 7
  }
  ```

  - <b>URL</b> : http://localhost:5240/api/transports/transports
  - <b>Method</b>: POST
  - <b>Description</b>: Add new Transport
  - <b>Body</b>: 
  ```console
  {
    "id": 1,
    "corporateId": 4,
    "managerId": 7
  }
  ```
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 

  - <b>URL</b> :http://localhost:5240/api/Transports/transports/{transportId}
  - <b>Method</b>: PUT
  - <b>Description</b>: Update an existing Transportor Data
  - <b>Body</b>:
    ```console
  {
    "id": 1,
    "corporateId": 4,
    "managerId": 7
  }
  ```
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 


  - <b>URL</b> : http://localhost:5240/api/Transports/transports/{transportId}
  - <b>Method</b>: DELETE
  - <b>Description</b>: Delete an existing Transport Data
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> : 

  - <b>URL</b> : http://localhost:5240/api/Transports/{transporterId}/vehicles
  - <b>Method</b>: GET
  - <b>Description</b>: Get vhehicles of transporter wich is belongs to given transportId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
      [
   {
    "id": 7,
    "transporterId": 2,
    "vehicleType": "tata1109",
    "rtoNumber": "MH 14 JD 9593"
  },
  {
    "id": 8,
    "transporterId": 2,
    "vehicleType": "LP",
    "rtoNumber": "MH 14 JD 1122"
  }
      ]
      ```

- <b>URL</b> : http://localhost:5240/api/Transports/corporateid/{transporterId}
  - <b>Method</b>: GET
  - <b>Description</b>: Get CorporateId by transporterId
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
  4
  ```

- <b>URL</b> : http://localhost:5240/api/Transports/{transporterId}/invoices/{paymentStatus}
  - <b>Method</b>: GET
  - <b>Description</b>: Get invoice details of transporter belongs to the transportId and paymentStatus
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
 [
  {
    "corporateId": 7,
    "date": "2023-10-09T20:57:04",
    "paymentStatus": "unpaid",
    "freightCharges": 1400
  },
  {
    "corporateId": 7,
    "date": "2023-10-09T20:57:04",
    "paymentStatus": "unpaid",
    "freightCharges": 1400
  },
  {
    "corporateId": 7,
    "date": "2023-10-09T20:57:04",
    "paymentStatus": "unpaid",
    "freightCharges": 1400
  },
 ]
 ``

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
