using EmployeesAPI.Context;
using EmployeesAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace EmployeesAPI.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private readonly IConfiguration _configuration;
    public EmployeeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<User>> GetEmployees()
    {
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
               var employees = await (
                    from employee in context.Employees
                    join userRole in context.UserRoles on employee.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "employee"
                    select employee
                    ).ToListAsync();
                if (employees == null)
                {
                    return null;
                }
                return employees;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<User> GetEmployee(int employeeId)
    {
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                User employee = await context.Employees.FindAsync(employeeId);
                if (employee == null)
                {
                    return null;
                }
                return employee;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

 }
