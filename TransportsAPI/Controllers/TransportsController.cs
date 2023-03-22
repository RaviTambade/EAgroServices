using TransportsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using TransportsAPI.Services.Interfaces;

namespace TransportsAPI.Controller;

[ApiController]
public class TransportController : ControllerBase
{

    private readonly ITransportService _service;

    public TransportController(ITransportService service)
    {

        this._service = service;
    }

    [HttpGet("/api/transports")]

    public IActionResult GetAllTransports()
    {

        try
        {
            var data = _service.GetAllTransports();
            if (data == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(data);
            }

        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }


    [HttpGet("/api/transports/{id}")]
    public IActionResult GetById(string id)
    {
        try
        {

            var message = _service.GetTransportById(id);
            if (message == null)
            {
                return NotFound();
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


    [HttpPost("/api/transports/insert")]
    public IActionResult InsertTransport([FromBody] Transport transport)
    {
        try
        {
            bool status = _service.InsertTransport(transport);

            if (status)
            {
                // return Ok();
                 return Ok("Record Inserted sucessfully");
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }


    [HttpPut("/api/transports/update/")]

    public IActionResult UpdateDepartment ( [FromBody] Transport transport)
    {
        try
        {
            bool status = _service.UpdateTransport(transport);
            if (status)
            {
                return Ok("Record Updated sucessfully");
                //   return Ok();
            }
            else
            {
                  return NotFound();
            }
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("/api/transports/delete/{id}")]
    public IActionResult DeleteTransport(string id)
    {
        try
        {
            bool status = _service.DeleteTransport(id);
            if (status)
            {
            //   return Ok();
               return Ok("Record deleted sucessfully");
            }
            else
            {
                 return NotFound();
            }
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}


