using EmployeesAPI.Models;
namespace EmployeesAPI.Repositories;
public interface IEmployeeRepository
{
    Task<List<User>> GetEmployees();
    Task<User> GetEmployee(int employeeId);

}
