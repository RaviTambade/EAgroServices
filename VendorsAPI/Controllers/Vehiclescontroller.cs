using Microsoft.AspNetCore.Mvc;
using VendorsAPI.Models;
using VendorsAPI.Services.Interfaces;
namespace VendorsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleServices _service;
    public VehicleController(IVehicleServices service)
    {
        this._service = service;
    }
    [HttpGet("allVehicles")]
    public async Task<IEnumerable<Vehicle>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("getdetails/{id}")]
    public async Task<Vehicle> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert/{id}")]
    public async Task<bool> Insert(int id,[FromBody] Vehicle Vehicle)
    {
       Vehicle.VendorId=id;
    System.Console.WriteLine(Vehicle.Id);
       System.Console.WriteLine(Vehicle.VendorId);
       System.Console.WriteLine(Vehicle.VehicleNumber);
        return await _service.Insert(Vehicle);
    }
    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Vehicle Vehicle)
    {
        return await _service.Update(id, Vehicle);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}