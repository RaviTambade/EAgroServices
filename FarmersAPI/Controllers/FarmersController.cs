using FarmersAPI.Models;
using FarmersAPI.Services.Interfaces;
using FarmersAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FarmersAPI.Controllers;
[ApiController]
public class FarmersControllers : ControllerBase
{
    private readonly IFarmerService _srv;

    public FarmersControllers(IFarmerService srv)
    {
        this._srv = srv;
    }

    [HttpGet("/api/farmers")]
    public IActionResult GetAllFarmers()
    {
        var message = _srv.GetAllFarmers();
        if (message == null)
        {
            return BadRequest();
        }
        else
        {
            return Ok(message);
        }

    }


   [HttpGet("/api/farmers/{id}")]
    public IActionResult GetFarmerById(int id)
    {
        var message = _srv.GetFarmerById(id);
        if (message == null)
        {
            return BadRequest();
        }
        else
        {
            return Ok(message);
        }
    }

     [HttpPost("/api/farmers/insert")]
    public IActionResult InsertFarmer([FromBody]  Farmer farmer)
    {
        bool  status= _srv.InsertFarmer(farmer);
        if (status)
        {
            return Ok("record inserted successfully");
        }
        else
        {
         return BadRequest();
        }
    }

    [HttpPut("/api/farmers/update")]

    public IActionResult UpdateFarmer([FromBody] Farmer farmer){
        bool status=_srv.UpdateFarmer(farmer);
         if (status)
        {
            return Ok("record updated successfully");
        }
        else
        {
         return BadRequest();
        }
        
    }

        [HttpDelete("/api/farmers/delete/{id}")]
         public IActionResult DeleteFarmer(int id){
        bool status=_srv.DeleteFarmer(id);
         if (status)
        {
            return Ok("record deleted successfully");
        }
        else
        {
         return BadRequest();
        }
        
    }

}   




