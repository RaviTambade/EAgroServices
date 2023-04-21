using System.Reflection.Metadata;
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

    [HttpGet("getallemployees")]
    public async Task<List<Employee>> GetEmployees()
    {
        return await _service.AllEmployee();
    }

    [HttpGet("GetById/{id}")]
    public async Task<Employee> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] Employee employee)
    {
        return await _service.Insert(employee);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Employee employee)
    {
        return await _service.Update(id, employee);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);

    }
}
