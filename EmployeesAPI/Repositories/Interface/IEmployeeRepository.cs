using EmployeesAPI.Models;
namespace EmployeesAPI.Repositories;
public interface IEmployeeRepository
{
    Task<List<User>> GetEmployees();
    Task<User> GetEmployee(int employeeId);
    // Task<bool> Insert(User employee,User user,UserRole userRole);
    // Task<bool> Update(int consigneeId,Employee employee);
    // Task<bool> Delete(int employeeId);
}