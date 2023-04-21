using System.ComponentModel.DataAnnotations.Schema;
namespace EmployeesAPI.Models;

public class Employee
{

[Column("employee_id")]
public int EmployeeId{get;set;}
[Column("first_name")]
public string FirstName{get;set;}
[Column("last_name")]
public string LastName{get;set;}
[Column("contact_number")]
public string ContactNumber{get;set;}
[Column("password")]
public string Password{get;set;}
[Column("location")]
public string Location{get;set;}
[Column("salary")]
public string Salary{get;set;}

}

