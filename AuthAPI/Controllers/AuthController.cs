using AuthAPI.Models;
using AuthAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace AuthAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserServices _service;
    public AuthController(IUserServices serv)
    {
        _service = serv;
    }
    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest request)
    {
        var token = await _service.Authenticate(request);
        if (token == null)
            return BadRequest(new { message = "Username or password is incorrect" });
        return Ok(token);
    }
}