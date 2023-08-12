using Farmers.Models;
// using Farmers.Extensions;


namespace Farmers.Repositories.Interfaces
{
    public interface IFarmersCollectionRepository
    {
  
        Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId);

        Task<List<FarmerCollection>> FarmerCollection(int farmerId);
        Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
        Task<List<MonthlyRevenue>> MonthlyRevenue(int farmerId);
        Task<List<CropRevenue>> CropRevenue(int farmerId);
        
    }
}
