
using BIService.Services.Interfaces;
using BIService.Repositories.Interfaces;
using BIService.Models;

namespace BIService.Services
{
    public class CollectionCenterService : ICollectionCenterService
    {
        private readonly ICollectionCenterRepository _repo;

        public CollectionCenterService(ICollectionCenterRepository repo)
        {
            _repo = repo;
        }

        
        public async Task<List<IRevenueModel>> GetRevenuesByType(int collectionCenterId, RevenueType revenueType, int forYear)
        {
           return await _repo.GetRevenuesByType(collectionCenterId,revenueType,forYear);
        }

        //  public async Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId)
        // {
        //     return await _repo.GetMonthOrders(collectionCenterId);
        // }

        // public async Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId)
        // {
        //   return await _repo.GetCropRevenues(collectionCenterId);
        // }
    }
}