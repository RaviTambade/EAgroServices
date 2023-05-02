using AuthAPI.Models;
using AuthAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace AuthAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserServices _serv;
    public AuthController(IUserServices serv)
    {
        _serv = serv;
    }

    [HttpPost]
    [Route("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest request)
    {
        var user = await _serv.Authenticate(request);

        if (user == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        return Ok(user);
    }

    [HttpGet]
    [Route("Getallusers")]
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _serv.GetAllUsers();
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(User user)
    {
        return await _serv.Insert(user);
    }

    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] User user)
    {
        return await _serv.Update(id, user);
    }
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _serv.Delete(id);
    }
}