using Microsoft.AspNetCore.Mvc;
using TransportsAPI.Models;
using TransportsAPI.Services.Interfaces;
namespace TransportsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class TruckController : ControllerBase
{
    private readonly ITruckServices _service;
    public TruckController(ITruckServices service)
    {
        this._service = service;
    }
    [HttpGet("alltrucks")]
    public async Task<IEnumerable<Truck>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("getdetails/{id}")]
    public async Task<Truck> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert/{id}")]
    public async Task<bool> Insert(int id,[FromBody] Truck truck)
    {
       truck.TransportId=id;
    System.Console.WriteLine(truck.Id);
       System.Console.WriteLine(truck.TransportId);
       System.Console.WriteLine(truck.TruckNumber);
        return await _service.Insert(truck);
    }
    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Truck truck)
    {
        return await _service.Update(id, truck);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}