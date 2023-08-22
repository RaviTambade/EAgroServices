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

        public async Task<List<CropRevenue>> GetCropRevenuesByMonth(
            int collectionCenterId,
            int year,
            string monthName
        )
        {
            return await _repo.GetCropRevenuesByMonth(collectionCenterId, year, monthName);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesByQuarter(
            int collectionCenterId,
            int year,
            int quarterNumber
        )
        {
            return await _repo.GetCropRevenuesByQuarter(collectionCenterId, year, quarterNumber);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year)
        {
            return await _repo.GetCropRevenuesByYear(collectionCenterId, year);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
            int collectionCenterId,
            string startDate,
            string endDate
        )
        {
            return await _repo.GetCropRevenuesBetweenDates(collectionCenterId, startDate, endDate);
        }

        public async Task<List<int>> GetYearsForCropRevenues(int collectionCenterId)
        {
            return await _repo.GetYearsForCropRevenues(collectionCenterId);
        }


    }
}
