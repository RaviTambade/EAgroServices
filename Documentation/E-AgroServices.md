

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
        - <b>Body</b>:
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

### Crop API

- <b>URL</b> : http://localhost:5250/api/crop
  - <b>Method</b>: GET
  - <b>Description</b>: Gets the all Varieties
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
  [
  {
    "id": 1,
    "title": "Potato",
    "imageUrl": "/assets/images/potato.jpeg",
    "rate": 32
  },
  {
    "id": 2,
    "title": "Tomato",
    "imageUrl": "/assets/images/tomato.jpeg",
    "rate": 12
  }
  ]
``

- <b>URL</b> : http://localhost:5250/api/crops/{cropId}
  - <b>Method</b>: GET
  - <b>Description</b>: Gets the  Varieties belongs to given Id
  - <b>Body</b>: Not requried
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
  {
    "id": 1,
    "title": "Potato",
    "imageUrl": "/assets/images/potato.jpeg",
    "rate": 32
  }
``

- <b>URL</b> : http://localhost:5250/api/crop
  - <b>Method</b>: POST
  - <b>Description</b>: 
  - <b>Body</b>:
```console
  {
        "varietyName": "potato"
    }
```
 - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :


- <b>URL</b> : http://localhost:5250/api/crops/{cropId}
  - <b>Method</b>: PUT
  - <b>Description</b>: Gets the  Varieties belongs to given Id
  - <b>Body</b>:
```console
  {
        "varietyName": "potato"
    }
```
 - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :

  - <b>URL</b> : http://localhost:5250/api/crops/{cropId}
  - <b>Method</b>: Delete
  - <b>Description</b>: Gets the  Varieties belongs to given Id
  - <b>Body</b>:Not Require
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :


  - <b>URL</b> : http://localhost:5250/api/crops/nameswithid
  - <b>Method</b>: GET
  - <b>Description</b>: Gets the crop Name and Id
  - <b>Body</b>:Not Require
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
[
  {
    "id": 6,
    "name": "Beans"
  },
  {
    "id": 5,
    "name": "Bitroot"
  }
]
```

  - <b>URL</b> : http://localhost:5250/api/crops/name
  - <b>Method</b>: GET
  - <b>Description</b>: Get all crop Names of the crops
  - <b>Body</b>:Not Require
  - <b>JWTToken Header</b>: Not required
  - <b>Response</b> :
  ```console
[
  "Beans",
  "Bitroot",
  "Brinjal",
  "Cabbage",
  "Onion",
  "pea",
  "Potato",
  "soyabean",
  "Tomato",
  "wheat"
]
```
