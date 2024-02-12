using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetVehicles()
    {
        try
        {
        IEnumerable<Vehicle> vehicles = await _vehicleService.FindAll();
          if (vehicles == null)
            {
                return NoContent();
            }
            return Ok(vehicles);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetVehicleById(int id)
    {
        try
        {
        Vehicle vehicle = await _vehicleService.FindById(id);
        
                if (vehicle == null)
            {
                return NoContent();
            }
            return Ok(vehicle);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(Vehicle vehicle)
    {
        try
        {
        await _vehicleService.Add(vehicle);
            return CreatedAtAction(
                nameof(GetVehicleById),
                new { id = vehicle.Id },
                vehicle
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(Vehicle vehicle)
    {
        try
        {
        await _vehicleService.Update(vehicle);
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
        await _vehicleService.Delete(id);
                     return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
