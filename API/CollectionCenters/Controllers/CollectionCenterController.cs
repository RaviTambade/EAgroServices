using CollectionCenters.Models;
using CollectionCenters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CollectionCenters.Controllers
{
    [ApiController]
    [Route("/api/collectioncenters")]
    public class CollectionCenterController : ControllerBase
    {
        private readonly ICollectionCenterService _srv;

        public CollectionCenterController(ICollectionCenterService srv)
        {
            _srv = srv;
        }

        [HttpGet]
        public async Task<List<CollectionCenter>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("{collectionCenterId}")]
        public async Task<CollectionCenter> GetById(int collectionCenterId)
        {
            return await _srv.GetById(collectionCenterId);
        }

        [HttpPost]
        public async Task<bool> Insert(CollectionCenter collectionCenter)
        {
            return await _srv.Insert(collectionCenter);
        }

        [HttpPut]
        public async Task<bool> Update(CollectionCenter collectionCenter)
        {
            return await _srv.Update(collectionCenter);
        }

        [HttpDelete("{collectionCenterId}")]
        public async Task<bool> Delete(int collectionCenterId)
        {
            return await _srv.Delete(collectionCenterId);
        }

        [HttpGet("corporateid/{collectionCenterId}")]
        public async Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId)
        {
            return await _srv.GetCorporateIdByCollectionCenterId(collectionCenterId);
        }

        [HttpGet("inspectorid/{inspectorId}")]
        public async Task<int> GetCollectionCenterIdByInspectorId(int inspectorId)
        {
            return await _srv.GetCollectionCenterIdByInspectorId(inspectorId);
        }

        [HttpGet("collectioncenterandcorporateid")]
        public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
        {
            return await _srv.GetCollectionCenterAndCorporateId();
        }
    }
}
