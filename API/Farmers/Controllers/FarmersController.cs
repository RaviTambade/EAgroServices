using Farmers.Models;
using Farmers.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace Farmers.Controllers
{
    [ApiController]
    [Route("/api/farmerscollections")]
    public class FarmersController : ControllerBase
    {
        private readonly IGoodsCollectionService _srv;

        public FarmersController(IGoodsCollectionService srv)
        {
            _srv = srv;
        }



         [HttpGet("verified/{farmerId}")]
        public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId )
        {
            Console.WriteLine(farmerId);
            return await _srv.GetVerifiedCollection(farmerId);
        }


        [HttpGet("{farmerId}")]
        public async Task<List<FarmerCollection>> FarmerCollections(int farmerId)
        {
            return await _srv.FarmerCollection(farmerId);
        }


         [HttpGet("unverifiedcollection/{farmerId}")]
        public async Task<List<FarmerCollection>> UnVerifiedCollections(int farmerId)
        {
            return await _srv.GetUnverifiedCollectionsOfFarmer(farmerId);
        }

         [HttpGet("monthlyrevenue/{farmerId}")]
         
        public async Task<List<Revenue>> MonthlyRevenue(int farmerId)
        {
            return await _srv.MonthlyRevenue(farmerId);

        }
         [HttpGet("yearrevenue/{farmerId}")]
         
        public async Task<List<Revenue>> YearRevenue(int farmerId)
        {
            return await _srv.YearRevenue(farmerId);

        }
         [HttpGet("croprevenue/{farmerId}")]
         
        public async Task<List<CropRevenue>> CropRevenue(int farmerId)
        {
            return await _srv.CropRevenue(farmerId);

        }
     }
 }
