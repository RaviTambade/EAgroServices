using EmployeesAPI.Models;
namespace EmployeesAPI.Repositories;
public interface IEmployeeRepository
{
    Task<List<Employee>> AllEmployee();
    Task<Employee> GetById(int employeeId);
    Task<bool> Insert(Employee employee);
    Task<bool> Update(int consigneeId,Employee employee);
    Task<bool> Delete(int employeeId);


}