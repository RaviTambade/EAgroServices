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
    public async Task<List<Employee>> AllEmployee()
    {
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                List<Employee> employees = await context.Employees.ToListAsync();
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
    public async Task<Employee> GetById(int employeeId)
    {
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                Employee employee = await context.Employees.FindAsync(employeeId);
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

    public async Task<bool> Insert(Employee employee,User user,UserRole userRole)
    {
        bool status = false;
        int userId=0;   
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                userId=user.UserId;
                Console.WriteLine(userId);
                employee.UserId=userId;
                userRole.UserId=userId;
                await context.UserRoles.AddAsync(userRole);
                await context.Employees.AddAsync(employee);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int employeeId, Employee employee)
    {
        bool status = false;
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                Employee? oldEmployee = await context.Employees.FindAsync(employeeId);
                if (oldEmployee != null)
                {
                    oldEmployee.FirstName = employee.FirstName;
                    oldEmployee.LastName = employee.LastName;
                    oldEmployee.Location = employee.Location;
                    oldEmployee.Salary= employee.Salary;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;

    }
    public async Task<bool> Delete(int employeeId)
    {
        bool status = false;
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                Employee? employee = await context.Employees.FindAsync(employeeId);
                if (employee != null)
                {
                    context.Employees.Remove(employee);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
}