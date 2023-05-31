using EmployeesAPI.Models;
using EmployeesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeesAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _service;
    public EmployeesController(IEmployeeService service)
    {
        this._service = service;
    }

    [HttpGet]
    public async Task<List<User>>getEmployees()
    {
        return await _service.GetEmployees();
    }

    [HttpGet("{id}")]
    public async Task<User> GetEmloyee(int id)
    {
        return await _service.GetEmployee(id);
    }
    // [HttpPost]
    // public async Task<bool> Insert([FromBody] UserEmployeeRole userEmployeeRole)
    // {
    //     Employee employee = userEmployeeRole.Employee;
    //     User user = userEmployeeRole.User;
    //     UserRole userRole = userEmployeeRole.UserRole;
    //     return await _service.Insert(employee, user, userRole);
    // }

    // [HttpPut("{id}")]
    // public async Task<bool> Update(int id, [FromBody] Employee employee)
    // {
    //     return await _service.Update(id, employee);
    // }

    // [HttpDelete("{id}")]
    // public async Task<bool> Delete(int id)
    // {
    //     return await _service.Delete(id);
    // }
}
