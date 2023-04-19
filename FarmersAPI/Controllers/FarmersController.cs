using FarmersAPI.Models;
using FarmersAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace FarmersAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FarmersController : ControllerBase
    {
        private readonly IFarmerService _srv;
        public FarmersController(IFarmerService srv)
        {
            this._srv = srv;
        }
        [HttpGet]
        [Route("getallfarmers")]
        public async Task<List<Farmer>> GetAllFarmers()
        {
            List<Farmer> farmers = await _srv.GetAllFarmers();
            return farmers;
        }

        [HttpGet]
        [Route("getdetails/{id}")]
        public async Task<Farmer> GetFarmerById(int id)
        {
            Farmer farmer = await _srv.GetFarmerById(id);
            return farmer;
        }

        [HttpPost]
        [Route("insert")]
        public async Task<bool> InsertFarmer([FromBody] Farmer farmer)
        {
            return await _srv.InsertFarmer(farmer);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<bool> UpdateFarmer(int id, [FromBody] Farmer farmer)
        { 
             return await _srv.UpdateFarmer(id, farmer);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<bool> DeleteFarmer(int id)
        {
            return await _srv.DeleteFarmer(id);
        }

    }
}




