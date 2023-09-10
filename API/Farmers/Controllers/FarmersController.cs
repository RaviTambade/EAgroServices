using Transflower.EAgroServices.Farmers.Models;
using Transflower.EAgroServices.Farmers.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.EAgroServices.Farmers.Controllers
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

        [HttpGet("verified/{farmerId}/{paymentStatus}")]
        public async Task<List<FarmerCollection>?> GetVerifiedCollection(
            int farmerId,
            string paymentStatus
        )
        {
            Console.WriteLine(farmerId);
            return await _srv.GetVerifiedCollection(farmerId, paymentStatus);
        }

        [HttpGet("verifiedcollection/{farmerId}")]
        public async Task<List<FarmerCollection>?> VerifiedCollection(int farmerId)
        {
            Console.WriteLine(farmerId);
            return await _srv.VerifiedCollection(farmerId);
        }

        [HttpGet("{farmerId}")]
        public async Task<List<FarmerCollection>> FarmerCollections(int farmerId)
        {
            return await _srv.FarmerCollection(farmerId);
        }

           [HttpGet("collectionlist/{farmerId}")]
        public async Task<List<CollectionList>> CollectionsList(int farmerId)
        {
            return await _srv.CollectionList(farmerId);
        }

        [HttpGet("unverifiedcollection/{farmerId}")]
        public async Task<List<FarmerCollection>> UnVerifiedCollections(int farmerId)
        {
            return await _srv.GetUnverifiedCollectionsOfFarmer(farmerId);
        }

        [HttpGet("croprevenue/{farmerId}")]
        public async Task<List<CropRevenue>?> CropRevenue(int farmerId)
        {
            return await _srv.CropRevenue(farmerId);
        }
    }
}
