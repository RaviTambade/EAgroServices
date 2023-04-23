using AuthAPI.Services.Interfaces;
using System.Collections.Generic;
using AuthAPI.Repository.Interfaces;
using AuthAPI.Services;
using AuthAPI.Repository;
using System.Threading.Tasks;
using AuthAPI.Models;
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;

namespace AuthAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class AuthController:ControllerBase{
    private readonly IUserServices _serv;

    public AuthController(IUserServices serv){
        _serv=serv;
    }

    [HttpGet]
    [Route("Getallusers")]
    public async Task<IEnumerable<User>> GetAllUsers(){
       return await _serv.GetAllUsers();
    }

    [HttpGet]
    [Route("getuser/{id}")]
    public async Task<User> GetUser(int id){
        return await _serv.GetUser(id);
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(User user){
        return await _serv.Insert(user);
    }

    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id,[FromBody]User user){
    return await _serv.Update(id,user);

}
      [HttpDelete]
      [Route("delete/{id}")]
      public async Task<bool> Delete(int id){
        return await _serv.Delete(id);
      }
}