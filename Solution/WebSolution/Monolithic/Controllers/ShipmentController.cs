using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class ShipmentController : ControllerBase
{
    private readonly IShipmentService _shipmentService;

    public ShipmentController(IShipmentService shipmentService)
    {
        _shipmentService = shipmentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetShipments()
    {
        try
        {
            IEnumerable<Shipment> shipments = await _shipmentService.FindAll();
            if (shipments == null)
            {
                return NoContent();
            }
            return Ok(shipments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetShipmentById(int id)
    {
        try
        {
            Shipment shipment = await _shipmentService.FindById(id);
            if (shipment == null)
            {
                return NoContent();
            }
            return Ok(shipment);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(Shipment shipment)
    {
        try
        {
            await _shipmentService.Add(shipment);
            return CreatedAtAction(nameof(GetShipmentById), new { id = shipment.Id }, shipment);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(Shipment shipment)
    {
        try
        {
            await _shipmentService.Update(shipment);
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
            await _shipmentService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
