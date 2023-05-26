using EmployeesAPI.Models;
namespace EmployeesAPI.Repositories;
public interface IEmployeeRepository
{
    Task<List<Employee>> GetAll();
    Task<Employee> GetById(int employeeId);
    Task<bool> Insert(Employee employee,User user,UserRole userRole);
    Task<bool> Update(int consigneeId,Employee employee);
    Task<bool> Delete(int employeeId);
}