using Microsoft.AspNetCore.Mvc;
using Transflower.Vehicles.Models;
using Transflower.Vehicles.Services.Interfaces;

namespace Transflower.Vehicles.Controller;

[ApiController]
[Route("/api/vehicles")]
public class VehiclesController : ControllerBase
{
    private readonly IVehicleService _service;

    public VehiclesController(IVehicleService service)
    {
        _service = service;
    }

    [HttpGet]
    [Route("")]
    public async Task<List<Vehicle>> GetAll()
    {
        List<Vehicle> vehicles = await _service.GetAll();
        return vehicles;
    }

    [HttpGet("numbers")]
    public async Task<List<string>> GetvehicleNumbers()
    {
        return await _service.GetvehicleNumbers();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
        Vehicle vehicle = await _service.GetVehicle(vehicleId);
        return vehicle;
    }

    [HttpPost]
    [Route("")]
    public async Task<bool> Insert(Vehicle vehicle)
    {
        bool status = await _service.Insert(vehicle);
        return status;
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
        bool status = await _service.Update(vehicleId, vehicle);
        return status;
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(int vehicleId)
    {
        bool status = await _service.Delete(vehicleId);
        return status;
    }

    [HttpGet("availabelvehicles")]
    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        return await _service.GetAvailableVehicleNumbers();
    }
}
