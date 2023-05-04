
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
```

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
<hr>
