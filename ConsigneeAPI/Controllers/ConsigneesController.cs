using ConsigneesAPI.Models;
using ConsigneesAPI.Services;
using Microsoft.AspNetCore.Mvc;


namespace ConsigneesAPI.Controller;

[ApiController]
public class ConsigneesController : ControllerBase
{

    private readonly IConsigneeService _service;

    public ConsigneesController(IConsigneeService service)
    {

        this._service = service;
    }

    [HttpGet("/api/consignees")]

    public IActionResult GetConsignees()
    {

        try
        {
            var message = _service.AllConsignee();
            if (message == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(message);
            }

        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
