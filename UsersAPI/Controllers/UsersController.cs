using UsersAPI.Models;
using UsersAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace UsersAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _srv;
    public UsersController(IUserService srv)
    {
        _srv = srv;
    }
    [HttpGet]
    public async Task<List<User>> GetAll(){
        return await _srv.GetAll();
    }
     [HttpGet("{id}")]
    public async Task<User> GetUser(int id){
        return await _srv.GetUser(id);
    }
      [HttpPost]
    public async Task<bool> Insert(UserRoleInsert userRoleInsert){
        User user=userRoleInsert.User;
        UserRole userRole=userRoleInsert.UserRole;
        return await _srv.Insert(user,userRole);
        
    }
}