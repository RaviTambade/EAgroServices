using GoodsCollections.Models;
using GoodsCollections.Entities;
using GoodsCollections.Extensions;
using GoodsCollections.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GoodsCollections.Controllers
{
    [ApiController]
    [Route("/api/goodscollections")]
    public class GoodsCollectionController : ControllerBase
    {
        private readonly IGoodsCollectionService _srv;

        public GoodsCollectionController(IGoodsCollectionService srv)
        {
            _srv = srv;
        }

        [HttpPost("{collectionCenterId}")]
        public async Task<List<Collection>>? GetCollections(
            int collectionCenterId,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber,
            [FromQuery] string type="Unverified"
        )
        {
            var collections =  await _srv.GetCollections(collectionCenterId, request, pageNumber,type);
            Response.AddPaginationHeader(collections);
            return collections;
        }

        [HttpGet("collection/{collectionId}")]
        public async Task<GoodsCollection?> GetById(int collectionId)
        {
            return await _srv.GetById(collectionId);
        }

        [HttpGet("verified/{farmerId}")]
        public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId)
        {
            return await _srv.GetVerifiedCollection(farmerId);
        }

        [HttpPost]
        public async Task<bool> Insert(GoodsCollection collection)
        {
            return await _srv.Insert(collection);
        }

        [HttpPut]
        public async Task<bool> Update(GoodsCollection collection)
        {
            return await _srv.Update(collection);
        }

        [HttpDelete("{collectionId}")]
        public async Task<bool> Delete(int collectionId)
        {
            return await _srv.Delete(collectionId);
        }

        [HttpGet("farmercollection/{farmerId}")]
        public async Task<List<FarmerCollection>> FarmerCollections(int farmerId)
        {
            return await _srv.FarmerCollection(farmerId);
        }

        [HttpPost("verified/collectioncenter/{collectionCenterId}")]
        public async Task<List<VerifiedCollectionDetails>>? GetVerifiedCollections(
            int collectionCenterId,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var collectionDetails =  await _srv.GetVerifiedCollections(
                collectionCenterId,
                request,
                pageNumber
            );
            Response.AddPaginationHeader(collectionDetails);
            return collectionDetails;
        }

        [HttpGet("containertypes")]
        public async Task<List<string?>> GetContainerTypes()
        {
            return await _srv.GetContainerTypes();
        }

        [HttpGet("farmerunverifiedcollection/{farmerId}")]
        public async Task<List<FarmerCollection>> GetVerifiedFarmerCollections(int farmerId)
        {
            return await _srv.GetUnverifiedCollectionsOfFarmer(farmerId);
        }
    }
}
