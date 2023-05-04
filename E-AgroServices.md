AccountsAPI:

URL=localhost:5107/api/accounts/getallaccounts
Method=GET
Description=Gets the all accounts of users

URL=localhost:5107/api/accounts/getaccount/{id}

Id=accountId
Method=GET
Description=Gets the user account by its account id

URL=localhost:5107/api/accounts/insert
Method=POST
Description=Adding a new account for a user
Body=  
```console
{
        "accountNumber": "123213232",
        "ifscCode": "asdfg852",
        "userId": 1
    }
```

URL=localhost:5107/api/accounts/update/{id}
	Id=accountId
	Method=PUT
	Description=Update an existing account number  and ifsc code of user
	URL=localhost:5107/api/accounts/update/1
	Body=  {
        "accountNumber": "123213232",
        "ifscCode": "asdfg852",
        "userId": 1
    }

	URL=localhost:5107/api/accounts/delete/{id}
	Id=accountId
	Method=DELETE
	Description=Delete an existing user’s account details

	AdminAPI:

	URL= http://localhost:5051/api/admins/getalladmins
	Method=GET
	Description=Get the all Admins 

	URL= http://localhost:5051/api/admins/getbyid/{id}
	Id=adminId
	Method=GET
	Description=Gets the Admin by its Admin id

	URL= http://localhost:5051/api/admins/insert
	Method=Post
	Description=Insert  the New Admin 
	Body= {
    "admin":{
    "firstName": "Ashok",
    "lastName": "Chakkar",
    "location": "Bhavadi"
},
"user":{
    "contactNumber":"12457896312",
    "password":"123456"
},
"userRole":{
 "roleId":1   }}    
	URL= http://localhost:5051/api/admins/update/{id}
	Id = adminId
	Method=Put
	Description= Update an existing Admin details  
	Body= {
    "admin":{
    "firstName": "Ashok",
    "lastName": "Chakkar",
    "location": "Bhavadi"
}


	URL= http://localhost:5051/api/admins/delete/{id}
	Id=adminId
	Method=Delete
	Description=Delete An existing Admin.

	EmployeesAPI:

	URL= http://localhost:5265/api/employees/getallemployees
	Method=GET
	Description=Gets the all Employees


	URL= http://localhost:5265/api/employees/getbyid/{id}
	Id=adminId
	Method=GET
	Description=Gets the Employees  By Its Id


	URL= http://localhost:5265/api/employees/insert
	Method=Post
	Description=Insert new Employees  

	Body= {
        "firstName": "Abhay",
        "lastName": "Navale",
        "location": "Bhavadi",
        "salary": "15000",
    },
"user":{
    "contactNumber":"12457896312",
    "password":"123456"
},
"userRole":{
 "roleId":3   }}    



	URL= http://localhost:5265/api/employees/update/{id}
	Id=employeeId
	Method=Put
	Description=Update An Existing Employees 
	Body= {
        "firstName": "Abhay",
        "lastName": "Navale",
        "location": "Bhavadi",
        "salary": "15000",
    }


	URL= http://localhost:5265/api/employees/delete/{id}
	Id= employeeId
	Method=Delete
	Description=Delete An Existing Employees 


	FarmerAPI:

	URL= http://localhost:5141/api/farmers/getallfarmers
	Method=GET
	Description=Gets the all Farmers


	URL= http://localhost:5141/api/farmers/getdetails/{id}
	Id=farmerId
	Method=GET
	Description=Gets the Farmers By its id

	URL= http://localhost:5141/api/farmers/insert
	Method=Post
	Description=Insert New Farmers 
	Body=
  {
        "firstName": "Rohit",
        "lastName": "Gore",
        "location": "Peth",
            },
"user":{
    "contactNumber":"12457896312",
    "password":"123456"
},
"userRole":{
 "roleId":3   }}    


	URL= http://localhost:5141/api/farmers/update/{id}
	Id=farmerId
	Method=Put
	Description=Update An existing  Farmers Data
	Body=
  {
        "firstName": "Rohit",
        "lastName": "Gore",
        "location": "Peth",
            },


	URL= http://localhost:5141/api/farmers/delete/{id}
	Id=farmerid
	farmer
	Method=delete
	Description=Delete an existing account


	MerchantsAPI:

	URL= http://localhost:5188/api/merchants/getallmerchants
	Method=GET
	Description=Gets the all Farmers

	URL= http://localhost:5188/api/merchants/getbyid/{id}
	Id=merchantId
	Method=GET
	Description=Get merchant by  its id 

	URL= http://localhost:5188/api/merchants/insert
	Method=Post
	Description=Insert new Merchant 
	Body= 
	{
        "firstName": "Ramesh",
        "lastName": "Gawade",
        "companyName": "Zatka Company",
        "location": "Manchar"
    },
"user":{
    "contactNumber":"12457896312",
    "password":"123456"
},
"userRole":{
 "roleId":3   }}    

	URL= http://localhost:5188/api/merchants/Update/{id}
	Id=merchantId
	Method=Put
	Description=Update an existing Merchant Data 
	Body=
 {
	  "firstName": "Ramesh",
        "lastName": "Gawade",
        "companyName": "Zatka Company",
        "location": "Manchar"
    },
	URL= http://localhost:5188/api/merchants/Delete/{id}
	Id=merchantId
	Method=Delete
	Description=Delete an existing Merchant Data 

	MerchantsAPI:

