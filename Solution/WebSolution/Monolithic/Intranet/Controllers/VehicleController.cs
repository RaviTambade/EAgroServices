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
    public async Task<IEnumerable<Vehicle>> GetVehicles()
    {
        IEnumerable<Vehicle> vehicles = await _vehicleService.FindAll();
        return vehicles;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Vehicle> GetVehicleById(int id)
    {
        Vehicle vehicle = await _vehicleService.FindById(id);
        return vehicle;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(Vehicle vehicle)
    {
        await _vehicleService.Add(vehicle);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(Vehicle vehicle)
    {
        await _vehicleService.Update(vehicle);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _vehicleService.Delete(id);
    }
}
