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
    public async Task<List<Employee>> GetAll()=>await _repo.GetAll(); 
    public async Task<Employee> GetById(int employeeId)=>await _repo.GetById(employeeId);
     public async Task<bool> Insert(Employee employee, User user, UserRole userRole)=>await _repo.Insert(employee,user,userRole);
    public async Task<bool> Update(int employeeId,Employee employee)=> await _repo.Update(employeeId,employee);
    public async Task<bool> Delete(int employeeId)=>await _repo.Delete(employeeId);
}