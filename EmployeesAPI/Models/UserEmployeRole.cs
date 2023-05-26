using System.ComponentModel.DataAnnotations.Schema;
namespace EmployeesAPI.Models;
public class UserEmployeeRole
{
    public User? User {get;set;}
    public Employee? Employee{get;set;}
    public UserRole? UserRole{get;set;}
}