using GoodsCollections.Models;
using GoodsCollections.Extensions;
using GoodsCollections.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public  List<Collection>? GetCollections(
            int collectionCenterId,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var collections = _srv.GetCollections(collectionCenterId, request, pageNumber);
            if (collections != null)
            {
                var metadata = new
                {
                    collections.TotalCount,
                    collections.CurrentPage,
                    collections.TotalPages,
                    collections.HasNext,
                    collections.HasPrevious
                };
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            }

            return collections;
        }

        [HttpGet("collection/{collectionId}")]
        public async Task<GoodsCollection> GetById(int collectionId)
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
        public List<VerifiedCollectionDetails>? GetVerifiedCollections(
            int collectionCenterId,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var collectionDetails = _srv.GetVerifiedCollections(
                collectionCenterId,
                request,
                pageNumber
            );
            if (collectionDetails != null)
            {
                var metadata = new
                {
                    collectionDetails.TotalCount,
                    collectionDetails.CurrentPage,
                    collectionDetails.TotalPages,
                    collectionDetails.HasNext,
                    collectionDetails.HasPrevious
                };
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            }

            return collectionDetails;
        }

        [HttpGet("containertypes")]
        public async Task<List<string>> GetContainerTypes()
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
