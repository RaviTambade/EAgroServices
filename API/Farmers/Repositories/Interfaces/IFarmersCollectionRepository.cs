using Farmers.Models;
// using Farmers.Extensions;


namespace Farmers.Repositories.Interfaces
{
    public interface IFarmersCollectionRepository
    {
        // Task<List<CollectionDetails>> GetAll(int collectionCenterId);
    //     PagedList<CollectionDetails> GetAll(
    //     int collectionCenterId,
    //     FilterRequest request,
    //     int pageNumber
    // );
    //     Task<GoodsCollection> GetById(int collectionId);
    //     Task<bool> Insert(GoodsCollection collection);
    //     Task<List<string>> GetContainerTypes();

    //     Task<List<UnverifiedCollection>> GetUnverifiedCollections(int collectionCenterId);
        Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId);

        // Task<bool> Update(GoodsCollection collection);
        // Task<bool> Delete(int collectionId);
        Task<List<FarmerCollection>> FarmerCollection(int farmerId);
        Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
        Task<List<MonthlyRevenue>> MonthlyRevenue(int collectionId);
        
        // Task<List<FarmerCollection>> GetverifiedCollectionsOfFarmer(int farmerId);
    }
}
