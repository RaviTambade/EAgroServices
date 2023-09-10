using Transflower.EAgroServices.Farmers.Models;
namespace Transflower.EAgroServices.Farmers.Repositories.Interfaces;
public interface IFarmersCollectionRepository
{
    Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId, string paymentStatus);
    Task<List<FarmerCollection>> VerifiedCollection(int farmerId);
    Task<List<FarmerCollection>> FarmerCollection(int farmerId);
    Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
    Task<List<Revenue>> MonthlyRevenue(int farmerId);
    Task<List<Revenue>> YearRevenue(int farmerId);
    Task<List<CropRevenue>> CropRevenue(int farmerId);
    Task<List<CollectionList>> CollectionList(int farmerId);
}
