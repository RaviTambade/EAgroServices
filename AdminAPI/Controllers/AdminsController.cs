using System.Reflection.Metadata;
using AdminAPI.Models;
using AdminAPI.Services;
using AdminAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;
namespace AdminAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class AdminsController : ControllerBase
{
    private readonly IAdminServices _service;
    public AdminsController(IAdminServices service)
    {
        this._service = service;
    }

    [HttpGet("getallAdmins")]
    public async Task<List<Admin>> GetEmployees()
    {
        return await _service.GetAll();
    }

    [HttpGet("GetById/{id}")]
    public async Task<Admin> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] UserAdminRole userAdminRole)
    {
        Admin admin=userAdminRole.Admin;
        User user=userAdminRole.User;
        UserRole userRole=userAdminRole.UserRole;

        return await _service.Insert(admin,user,userRole);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Admin admin)
    {
        return await _service.Update(id, admin);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);

    }
}
