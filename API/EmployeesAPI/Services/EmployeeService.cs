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
   // public async Task<List<User>> GetAll()=>await _repo.GetEmployees(); 
    // public async Task<User> GetById(int employeeId)=>await _repo.GetEmployee(employeeId);

    public async Task<User> GetEmployee(int employeeId)
    {
       return await _repo.GetEmployee(employeeId);
    }

    public async Task<List<User>> GetEmployees()
    {
      return  await _repo.GetEmployees(); 
    }


    //  public async Task<bool> Insert(Employee employee, User user, UserRole userRole)=>await _repo.Insert(employee,user,userRole);
    // public async Task<bool> Update(int employeeId,Employee employee)=> await _repo.Update(employeeId,employee);
    // public async Task<bool> Delete(int employeeId)=>await _repo.Delete(employeeId);
}