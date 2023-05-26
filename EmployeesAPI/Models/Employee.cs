using System.ComponentModel.DataAnnotations.Schema;
namespace EmployeesAPI.Models;
public class Employee
{
    [Column("employee_id")]
    public int Id { get; set; }
    [Column("first_name")]
    public string? FirstName { get; set; }
    [Column("last_name")]
    public string? LastName { get; set; }
    [Column("location")]
    public string? Location { get; set; }
    [Column("salary")]
    public double Salary { get; set; }
    [Column("user_id")]
    public int UserId { get; set; }
}

