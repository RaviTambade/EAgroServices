
using EmployeesAPI.Models;
using EmployeesAPI.Repositories;

namespace EmployeesAPI.Services;

public class EmployeeService : IEmployeeService
{

    private readonly IEmployeeRepository _repo;  

    public EmployeeService(IEmployeeRepository repo)  
    {
        this._repo=repo;
    }
    public async Task<List<Employee>> AllEmployee()
    {
        return await _repo.AllEmployee();
    }
    public async Task<Employee> GetById(int employeeId)
    {
        return await _repo.GetById(employeeId);
    }
    public async Task<bool> Insert(Employee employee)
    {
        return await _repo.Insert(employee);
    }
    public async Task<bool> Update(int employeeId,Employee employee)
    {
        return await _repo.Update(employeeId,employee);

    }
    public async Task<bool> Delete(int employeeId)
    {
        return await _repo.Delete(employeeId);
    }
}