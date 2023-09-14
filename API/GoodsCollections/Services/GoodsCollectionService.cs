using Transflower.EAgroServices.GoodsCollections.Services.Interfaces;
using Transflower.EAgroServices.GoodsCollections.Repositories.Interfaces;
using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Entities;
using Transflower.EAgroServices.GoodsCollections.Extensions;

namespace Transflower.EAgroServices.GoodsCollections.Services
{
    public class GoodsCollectionService : IGoodsCollectionService
    {
        private readonly IGoodsCollectionRepository _repository;

        public GoodsCollectionService(IGoodsCollectionRepository repository)
        {
            _repository = repository;
        }

        public async Task<PagedList<VerifiedCollectionDetail>> GetVerifiedCollections(
            int collectionCenterId,
            FilterRequest request,
            int pageNumber
        )
        {
            return await _repository.GetVerifiedCollections(
                collectionCenterId,
                request,
                pageNumber
            );
        }

        public async Task<List<string?>> GetContainerTypes()
        {
            return await _repository.GetContainerTypes();
        }

        public async Task<GoodsCollection?> GetById(int collectionId)
        {
            return await _repository.GetById(collectionId);
        }

        public async Task<bool> Insert(GoodsCollection collection)
        {
            return await _repository.Insert(collection);
        }

        public async Task<bool> Update(GoodsCollection collection)
        {
            return await _repository.Update(collection);
        }

        public async Task<bool> Delete(int collectionId)
        {
            return await _repository.Delete(collectionId);
        }

        public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
        {
            return await _repository.FarmerCollection(farmerId);
        }

        public async Task<List<FarmerCollection>> GetVerifiedCollection(int collectionId)
        {
            return await _repository.GetVerifiedCollection(collectionId);
        }

        public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
        {
            return await _repository.GetUnverifiedCollectionsOfFarmer(farmerId);
        }

        public async Task<PagedList<Collection>> GetCollections(
            int collectionCenterId,
            FilterRequest request,
            int pageNumber,
            string type
        )
        {
            return await _repository.GetCollections(collectionCenterId, request, pageNumber, type);
        }
        public async Task<List<CollectionList>> GetCollectionList(
            int collectionCenterId,
            // FilterRequest request,
            // int pageNumber,
             string type
        )
        {
            return await _repository.GetCollectionList(collectionCenterId,type);
        }
    }
}
