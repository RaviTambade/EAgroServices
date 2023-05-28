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

        [HttpGet("collections/{id}")]
        public async Task<List<FarmerCollection>> GetFarmerCollections(int id)
        {
            return await _srv.GetFarmerCollections(id);
        }

        [HttpGet("collectionsamountpermonth/{id}")]
        public async Task<List<FarmerCollectionPerMonth>> GetFarmerCollectionAmountByMonth(int id)
        {
            return await _srv.GetFarmerCollectionAmountByMonth(id);
        }

        [HttpGet("collectionsamountbycrop/{id}")]
        public async Task<List<FarmerCollectionByCrop>> GetFarmerCollectionAmountByCrop(int id)
        {
            return await _srv.GetFarmerCollectionAmountByCrop(id);
        }
    }
}
