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
        public async Task<List<Farmer>> GetFarmers()
        {
            return await _srv.GetFarmers();
        }

        [HttpGet("{id}")]
        public async Task<Farmer> GetFarmer(int id)
        {
            return await _srv.GetFarmer(id);
        }
    }
}
