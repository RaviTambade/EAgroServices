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
        public  List<CollectionDetails> GetAll(
            int collectionCenterId,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var collectionDetails =_srv.GetAll(collectionCenterId,request, pageNumber);
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

        [HttpGet("collection/{collectionId}")]
        public async Task<GoodsCollection> GetById(int collectionId)
        {
            return await _srv.GetById(collectionId);
        }

        [HttpGet("unverified/{collectionCenterId}")]
        public async Task<List<UnverifiedCollection>> GetUnverifiedCollections(
            int collectionCenterId
        )
        {
            return await _srv.GetUnverifiedCollections(collectionCenterId);
        }

        [HttpGet("verified/{collectionId}")]
        public async Task<VerifiedGoodsCollection> GetVerifiedCollection(int collectionId)
        {
            return await _srv.GetVerifiedCollection(collectionId);
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

        [HttpGet("containertypes")]
        public async Task<List<string>> GetContainerTypes()
        {
            return await _srv.GetContainerTypes();
        }
    }
}
