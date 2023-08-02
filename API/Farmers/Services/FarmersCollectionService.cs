using Farmers.Services.Interfaces;
using Farmers.Repositories.Interfaces;
using Farmers.Models;
// using Farmers.Extensions;


namespace Farmers.Services
{
    public class GoodsCollectionService : IGoodsCollectionService
    {
        private readonly IFarmersCollectionRepository _repo;

        public GoodsCollectionService(IFarmersCollectionRepository repo)
        {
            _repo = repo;
        }

        // public  PagedList<CollectionDetails> GetAll(int collectionCenterId,FilterRequest request,int pageNumber)
        // {
        //     return  _repo.GetAll(collectionCenterId,request, pageNumber);
        // }

        // public async Task<List<UnverifiedCollection>> GetUnverifiedCollections(
        //     int collectionCenterId
        // )
        // {
        //     return await _repo.GetUnverifiedCollections(collectionCenterId);
        // }

        // public async Task<List<string>> GetContainerTypes()
        // {
        //     return await _repo.GetContainerTypes();
        // }

        // public async Task<GoodsCollection> GetById(int collectionId)
        // {
        //     return await _repo.GetById(collectionId);
        // }

        // public async Task<bool> Insert(GoodsCollection collection)
        // {
        //     return await _repo.Insert(collection);
        // }

        // public async Task<bool> Update(GoodsCollection collection)
        // {
        //     return await _repo.Update(collection);
        // }

        // public async Task<bool> Delete(int collectionId)
        // {
        //     return await _repo.Delete(collectionId);
        // }

        public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
        {
            return await _repo.FarmerCollection(farmerId);
        }

        public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId)
        {
            return await _repo.GetVerifiedCollection(farmerId);
        }

        public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
        {
            return await _repo.GetUnverifiedCollectionsOfFarmer(farmerId);
        }

        public async Task<List<MonthlyRevenue>> MonthlyRevenue(int collectionId)
        {
                 return await _repo.MonthlyRevenue(collectionId);
        }
    }
}
