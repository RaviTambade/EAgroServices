using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Vehicles.Models;
using Vehicles.Services.Interfaces;
namespace Vehicles.Controller;
[ApiController]
[Route("/api/vehicles")]
public class VehiclesController:ControllerBase{
    private readonly IVehicleService _svc;
    public VehiclesController(IVehicleService svc){
        _svc=svc;
    }

    [HttpGet]
    [Route("")]
    public async Task<List<Vehicle>> GetAll(){
        List<Vehicle> vehicles=await _svc.GetAll();
        return vehicles;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Vehicle> GetVehicle(int id){
        Vehicle vehicle=await _svc.GetVehicle(id);
        return vehicle;
    }

    [HttpPost]
    [Route("")]
    public async Task<bool> Insert(Vehicle vehicle){
        bool status=await _svc.Insert(vehicle);
        return status;
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<bool> Update(int id,Vehicle vehicle){
        bool status=await _svc.Update(id,vehicle);
        return status;
    }

     [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(int id){
        bool status=await _svc.Delete(id);
        return status;
    }
    [HttpGet("numbers")]
     public async Task<List<VehicleNumber>> GetVehicleNumbers()
    {
        return await _svc.GetVehicleNumbers();
    }



}