using System.Collections.Generic;
using System.Net;
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
                List<Employee> employees = await context.Employee.ToListAsync();
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
                Employee employee = await context.Employee.FindAsync(employeeId);
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

    public async Task<bool> Insert(Employee employee)
    {
        bool status = false;
        try
        {
            using (var context = new EmployeeContext(_configuration))
            {
                await context.Employee.AddAsync(employee);
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
                Employee? oldEmployee = await context.Employee.FindAsync(employeeId);
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
                Employee? employee = await context.Employee.FindAsync(employeeId);
                if (employee != null)
                {
                    context.Employee.Remove(employee);
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