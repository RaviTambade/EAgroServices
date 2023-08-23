using CollectionCenters.Services.Interfaces;
using CollectionCenters.Repositories.Interfaces;
using CollectionCenters.Models;
using CollectionCenters.Entities;


namespace CollectionCenters.Services
{
    public class CollectionCenterService : ICollectionCenterService
    {
        private readonly ICollectionCenterRepository _repo;

        public CollectionCenterService(ICollectionCenterRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CollectionCenter>> GetAll()
        {
            return await _repo.GetAll();
        }

        public async Task<CollectionCenter?> GetById(int collectionCenterId)
        {
            return await _repo.GetById(collectionCenterId);
        }

        public async Task<bool> Insert(CollectionCenter collectionCenter)
        {
            return await _repo.Insert(collectionCenter);
        }

        public async Task<bool> Update(CollectionCenter collectionCenter)
        {
            return await _repo.Update(collectionCenter);
        }

        public async Task<bool> Delete(int collectionCenterId)
        {
            return await _repo.Delete(collectionCenterId);
        }

        public async Task<int> GetCollectionCenterIdByInspectorId(int inspectorId)
        {
            return await _repo.GetCollectionCenterIdByInspectorId(inspectorId);
        }

        public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
        {
            return await _repo.GetCollectionCenterAndCorporateId();
        }

        public async Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId)
        {
            return await _repo.GetCorporateIdByCollectionCenterId(collectionCenterId);
        }
    }
}
