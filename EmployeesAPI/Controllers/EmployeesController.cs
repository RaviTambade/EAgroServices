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
   
}
