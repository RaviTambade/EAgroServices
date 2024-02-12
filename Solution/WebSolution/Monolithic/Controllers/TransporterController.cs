using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class TransporterController : ControllerBase
{
    private readonly ITransporterService _transporterService;

    public TransporterController(ITransporterService transporterService)
    {
        _transporterService = transporterService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTransporters()
    {
        try
        {
            IEnumerable<Transporter> transporters = await _transporterService.FindAll();
            if (transporters == null)
            {
                return NoContent();
            }
            return Ok(transporters);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetTransporterById(int id)
    {
        try
        {
            Transporter transporter = await _transporterService.FindById(id);
            if (transporter == null)
            {
                return NoContent();
            }
            return Ok(transporter);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(Transporter transporter)
    {
        try
        {
            await _transporterService.Add(transporter);
            return CreatedAtAction(
                nameof(GetTransporterById),
                new { id = transporter.Id },
                transporter
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(Transporter transporter)
    {
        try
        {
            await _transporterService.Update(transporter);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _transporterService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
