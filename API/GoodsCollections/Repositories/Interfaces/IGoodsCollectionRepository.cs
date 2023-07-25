using GoodsCollections.Models;

namespace GoodsCollections.Repositories.Interfaces
{
    public interface IGoodsCollectionRepository
    {
        Task<List<CollectionDetails>> GetAll(int collectionCenterId);
        Task<GoodsCollection> GetById(int collectionId);
        Task<bool> Insert(GoodsCollection collection);
        Task<List<string>> GetContainerTypes();

        Task<List<UnverifiedCollection>> GetUnverifiedCollections(int collectionCenterId);
        Task<VerifiedGoodsCollection> GetVerifiedCollection(int collectionId);

        Task<bool> Update(GoodsCollection collection);
        Task<bool> Delete(int collectionId);
        Task<List<FarmerCollection>> FarmerCollection(int farmerId);
        Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
    }
}
