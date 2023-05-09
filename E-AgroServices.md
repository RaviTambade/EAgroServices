
<h3 align="center">AccountsAPI </h3>


URL

```console
localhost:5107/api/accounts/getallaccounts
```

Method = GET

Description = Gets the all accounts of users

Body = None

<hr>

URL

```console
localhost:5107/api/accounts/getaccount/{id}
```

Id = accountId

Method = GET

Description = Gets the user account by its account id

Body = None

<hr>

URL

```console
localhost:5107/api/accounts/insert
```

Method = POST

Description = Adding a new account for a user

Body

```console
{
    "accountNumber": "123213232",
    "ifscCode": "asdfg852",
    "userId": 1
}
```

<hr>
URL

```console
localhost:5107/api/accounts/update/{id}
```

Id = accountId

Method = PUT

Description = Update an existing account number and ifsc code of user

Body

```console
{
    "accountNumber": "123213232",
    "ifscCode": "asdfg852",
    "userId": 1
}
```

<hr>
URL

```console
localhost:5107/api/accounts/delete/{id}


Id = accountId

Method = DELETE

Description = Delete an existing user’s account details

Body = None

<hr>
<hr>

<h3 align="center">AdminAPI </h3>


URL

```console
 http://localhost:5051/api/admins/getalladmins
```

Method = GET

Description = Get the all Admins

Body = None

<hr>

URL

```console
 http://localhost:5051/api/admins/getbyid/{id}
```

Id = adminId

Method = GET

Description = Gets the Admin by its Admin id

Body = None

<hr>

URL

```console
http://localhost:5051/api/admins/insert
```

Method = POST

Description = Insert the New Admin

Body

```console
{
    "admin": {
        "firstName": "Ashok",
        "lastName": "Chakkar",
        "location": "Bhavadi"
    },
    "user": {
        "contactNumber": "12457896312",
        "password": "123456"
    },
    "userRole": {
        "roleId": 1
    }
}
```
<hr>

URL 
```console
http://localhost:5051/api/admins/update/{id}
```
Id  =  adminId

Method = Put

Description =  Update an existing Admin details

Body
```console
{
    "firstName": "Ashok",
    "lastName": "Chakkar",
    "location": "Bhavadi"
}
```
<hr>

URL
```console
http://localhost:5051/api/admins/delete/{id}
```
Id = adminId

Method = Delete

Description = Delete An existing Admin.

Body = None
<hr>

<h3 align="center">EmployeesAPI </h3>


URL
```console
 http://localhost:5265/api/employees/getallemployees
 ```
Method = GET

Description = Gets the all Employees

Body = None
<hr>

URL
```console
 http://localhost:5265/api/employees/getbyid/{id}
 ```
Id = adminId

Method = GET

Description = Gets the Employees By Its Id

Body = None
<hr>

URL
```console
http://localhost:5265/api/employees/insert
```
Method = Post

Description = Insert new Employees

Body
```console
{
    "employee": {
        "firstName": "Abhay",
        "lastName": "Navale",
        "location": "Bhavadi",
        "salary": "15000"
    },
    "user": {
        "contactNumber": "12457896312",
        "password": "123456"
    },
    "userRole": {
        "roleId": 3
    }
}
```
<hr>

URL
```console
http://localhost:5265/api/employees/update/{id}
```
Id = employeeId

Method = PUT

Description = Update An Existing Employees

Body
```console
{
    "firstName": "Abhay",
    "lastName": "Navale",
    "location": "Bhavadi",
    "salary": "15000"
}
```
<hr>

 URL
```console
  http://localhost:5265/api/employees/delete/{id}
```
Id =  employeeId

Method = DELETE

Description = Delete An Existing Employees

Body = None

<hr>
<hr>

<h3 align="center">FarmerAPI </h3>


URL
```console
 http://localhost:5141/api/farmers/getallfarmers
```
Method = GET

Description = Gets the all Farmers

Body = None
<hr>

URL
```console
http://localhost:5141/api/farmers/getdetails/{id}
```
Id = farmerId

Method = GET

Description = Gets the Farmers By its Id

Body = None
<hr>

 URL
```console
 http://localhost:5141/api/farmers/insert
```
Method = POST

Description = Insert New Farmers

Body
```console
{
    "farmer": {
        "firstName": "Rohit",
        "lastName": "Gore",
        "location": "Peth"
    },
    "user": {
        "contactNumber": "12457896312",
        "password": "123456"
    },
    "userRole": {
        "roleId": 3
    }
}
```
<hr>

URL
```console
 http://localhost:5141/api/farmers/update/{id}
```
Id = farmerId

Method = PUT

Description = Update An existing Farmers Data

Body
```console
{
    "firstName": "Rohit",
    "lastName": "Gore",
    "location": "Peth"
}
```

<hr>

URL
```console
 http://localhost:5141/api/farmers/delete/{id}
```
Id = farmerId

Method = DELETE

Description = Delete an existing account

Body = None
<hr>
<hr>

<h3 align="center">MerchantsAPI </h3>


URL
```console
http://localhost:5188/api/merchants/getallmerchants
```
Method = GET

Description = Gets the all Farmers

Body = None

<hr>

URL
```console
 http://localhost:5188/api/merchants/getbyid/{id}
```
Id = merchantId

Method = GET

Description = Get merchant by its id

Body = None

<hr>

URL
```console
http://localhost:5188/api/merchants/insert
```
Method = POST
Description = Insert new Merchant
Body
```console
{
    "merchant": {
        "firstName": "Ramesh",
        "lastName": "Gawade",
        "companyName": "Zatka Company",
        "location": "Manchar"
    },
    "user": {
        "contactNumber": "12457896312",
        "password": "123456"
    },
    "userRole": {
        "roleId": 3
    }
}
```
<hr>


URL
```console
http://localhost:5188/api/merchants/Update/{id}
```
Id = merchantId

Method = PUT

Description = Update an existing Merchant Data

Body
```console
{
    "firstName": "Ramesh",
    "lastName": "Gawade",
    "companyName": "Zatka Company",
    "location": "Manchar"
}
```
<hr>

URL
```console
 http://localhost:5188/api/merchants/Delete/{id}
```
Id = merchantId

Method = DELETE

Description = Delete an existing Merchant Data

Body =  None
<hr>

<h3 align="center">TransportAPI </h3>

URL

```console
http://localhost:5240/api/transports/alltransports
```
Method = GET

Description = Gets the all Transportors

Body = None

<hr>

URL

```console
http://localhost:5240/api/transports/getdetails/{id}
```
Id = transportId

Method = GET

Description = Get Transportor by its id

Body = None

<hr>

URL
```console
http://localhost:5240/api/transports/insert
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
http://localhost:5240/api/Transports/Update/{id}
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
http://localhost:5240/api/Transports/Delete/{id}
```
Id = transportId

Method = DELETE

Description = Delete an existing Transport Data

<hr>

<h3 align="center">VarietiesAPI </h3>

URL
```console
http://localhost:5224/api/variety/getall
```
Method = GET

Description = Gets the all Varieties

Body = None

<hr>

URL
```console
http://localhost:5224/api/variety/getbyid/{id}
```
Id = varietyId

Method = GET

Description = Get variety by its id

Body = None
<hr>

URL
```console
http://localhost:5224/api/variety/insert
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
http://localhost:5224/api/variety/update/{id}
```
Id = varietyId

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
http://localhost:5224/api/variety/delete/{id}
```
Id = varietyId

Method = DELETE

Description = Delete an existing Variety Data

<hr>

 <h3 align="center">PurchaseAPI </h3>

URL
```console
http://localhost:5171/api/purchase/getallpurchaseitems
```
Method = GET

Description = Gets the all PurchaseItems

Body = None

<hr>

URL

```console
 http://localhost:5171/api/purchase/getbyid/{id}
```
Id = purchaseId

Method = GET

Description = Get purchase Details  by its purchaseid

Body = None

<hr>

URL
```console
 http://localhost:5171/api/purchase/insert
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
http://localhost:5224/api/purchase/update/{id}
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
http://localhost:5224/api/purchase/delete/{id}
```
Id = purchaseId

Method = DELETE

Description = Delete an existing purchase Data

<hr>

 <h3 align="center">SellsAPI </h3>

URL
```console
http://localhost:5182/api/sells/getallsells
```
Method = GET

Description = Gets the all Sells Details

Body = None

<hr>

URL

```console
 http://localhost:5182/api/sells/getdetails/{id}
```
Id = sellId

Method = GET

Description = Get Sell Details  by its sellid

Body = None

<hr>

URL
```console
http://localhost:5182/api/sells/insert
```
Method = POST

Description = Insert new Sell details

Body

```console
 
    {
        "sell": {
            
            "purchaseId": 4,
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
http://localhost:5182/api/sells/update/{id}
```
Id = sellId

Method = PUT

Description = Update an existing sell Data

Body
```console
  {
        "sell": {
            
            "purchaseId": 4,
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
http://localhost:5182/api/sells/delete/{id}
```
Id = sellId

Method = DELETE

Description = Delete an existing sell Data

<hr>
