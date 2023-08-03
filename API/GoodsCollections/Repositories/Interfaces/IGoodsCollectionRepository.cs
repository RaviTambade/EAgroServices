using GoodsCollections.Models;
using GoodsCollections.Extensions;

namespace GoodsCollections.Repositories.Interfaces
{
    public interface IGoodsCollectionRepository
    {
        // Task<List<VerifiedCollectionDetails>> GetVerifiedCollections(int collectionCenterId);
        PagedList<VerifiedCollectionDetails> GetVerifiedCollections(
            int collectionCenterId,
            FilterRequest request,
            int pageNumber
        );
        PagedList<Collection> GetCollections(
            int collectionCenterId,
            FilterRequest request,
            int pageNumber
        );
        Task<GoodsCollection> GetById(int collectionId);
        Task<bool> Insert(GoodsCollection collection);
        Task<List<string>> GetContainerTypes();

        Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId);

        Task<bool> Update(GoodsCollection collection);
        Task<bool> Delete(int collectionId);
        Task<List<FarmerCollection>> FarmerCollection(int farmerId);
        Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
        // Task<List<FarmerCollection>> GetverifiedCollectionsOfFarmer(int farmerId);
    }
}
