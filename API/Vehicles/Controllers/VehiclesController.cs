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


}