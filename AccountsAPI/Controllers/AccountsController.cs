using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AccountsAPI.Models;
using AccountsAPI.Services;
using AccountsAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace AccountsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class AccountsController:ControllerBase
{
    private readonly IAccountServices _srv;
    public AccountsController(IAccountServices srv)
    {
        _srv = srv;
    }
    [HttpGet]
    public async Task<IEnumerable<Account>> GetAll()
    {
        return await _srv.GetAll();
    }
    [HttpGet]
    [Route("{id}")]
    public async Task<Account> GetById(int id)
    {
        return await _srv.GetById(id);
    }
    [HttpPost]
    public async Task<bool> Insert(Account account)
    {
        return await _srv.Insert(account);
    }
    [HttpPut]
    [Route("{id}")]
    public async Task<bool> Update(int id,[FromBody]Account account)
    {
        return await _srv.Update(id,account);
    }
    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(int id){
    return await _srv.Delete(id);
    }
}
