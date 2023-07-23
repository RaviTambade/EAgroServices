using GoodsCollections.Services.Interfaces;
using GoodsCollections.Repositories.Interfaces;
using GoodsCollections.Models;

namespace GoodsCollections.Services
{
    public class GoodsCollectionService : IGoodsCollectionService
    {
        private readonly IGoodsCollectionRepository _repo;

        public GoodsCollectionService(IGoodsCollectionRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CollectionDetails>> GetAll(int collectionCenterId)
        {
            return await _repo.GetAll(collectionCenterId);
        }

        public async Task<List<string>> GetContainerTypes()
        {
            return await _repo.GetContainerTypes();
        }

        public async Task<GoodsCollection> GetById(int collectionId)
        {
            return await _repo.GetById(collectionId);
        }

        public async Task<bool> Insert(GoodsCollection collection)
        {
            return await _repo.Insert(collection);
        }

        public async Task<bool> Update(GoodsCollection collection)
        {
            return await _repo.Update(collection);
        }

        public async Task<bool> Delete(int collectionId)
        {
            return await _repo.Delete(collectionId);
        }

        public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
        {
            return await _repo.FarmerCollection(farmerId);
        }
    }
}
