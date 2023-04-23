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
    [Route("getallAccounts")]
    public async Task<IEnumerable<Account>> GetAllAccounts()
    {
        return await _srv.GetAllAccounts();
    }
    [HttpGet]
    [Route("getAccount/{id}")]
    public async Task<Account> GetAccount(int id)
    {
        return await _srv.GetAccount(id);
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(Account account)
    {
        return await _srv.Insert(account);

    }
    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id,[FromBody]Account account)
    {
        return await _srv.Update(id,account);

    }
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id){
    return await _srv.Delete(id);
    }
}
