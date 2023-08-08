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

        public async Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId)
        {
            return await _repo.GetRevenuesByYear(collectionCenterId);
        }

        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(
            int collectionCenterId,
            int year
        )
        {
            return await _repo.GetRevenuesByQuarter(collectionCenterId, year);
        }

        public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
        {
            return await _repo.GetRevenuesByMonth(collectionCenterId, year);
        }

        public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
        {
            return await _repo.GetRevenuesByWeek(collectionCenterId, year);
        }

        // public async Task<List<IRevenueModel>> GetRevenuesByType(int collectionCenterId, RevenueType revenueType, int year)
        // {
        //    return await _repo.GetRevenuesByType(collectionCenterId,revenueType,year);
        // }

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
