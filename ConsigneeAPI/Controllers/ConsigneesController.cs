using ConsigneesAPI.Models;
using ConsigneesAPI.Services;
using Microsoft.AspNetCore.Mvc;


namespace ConsigneesAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class ConsigneesController : ControllerBase
{

    private readonly IConsigneeService _service;

    public ConsigneesController(IConsigneeService service)
    {

        this._service = service;
    }

    [HttpGet("consignees")]

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


     [HttpGet("GetById/{id}")]
    public IActionResult GetById(int id)
    {
        var message = _service.GetById(id);
        if (message == null)
        {
            return BadRequest();
        }
        else
        {
            return Ok(message);
        }
    }

      [HttpPost("insert")]
    public IActionResult Insert([FromBody] Consignee consignee)
    {
        bool  status= _service.Insert(consignee);
        if (status)
        {
            return Ok("record inserted successfully");
        }
        else
        {
         return BadRequest();
        }
    }

     [HttpPut("update")]

    public IActionResult Update([FromBody] Consignee consignee){
        bool status=_service.Update(consignee);
         if (status)
        {
            return Ok("record updated successfully");
        }
        else
        {
         return BadRequest();
        }
        
    }
       [HttpDelete("delete/{id}")]
         public IActionResult Delete(int id){
        bool status=_service.Delete(id);
         if (status)
        {
            return Ok("record deleted successfully");
        }
        else
        {
         return BadRequest();
        }
        
    }
}
