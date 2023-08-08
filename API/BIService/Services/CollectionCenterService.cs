
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

         public async Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId)
        {
            return await _repo.GetMonthRevenues(collectionCenterId);
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