using Transflower.EAgroServices.BIService.Services.Interfaces;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Services
{
    public class CollectionCenterService : ICollectionCenterService
    {
        private readonly ICollectionCenterRepository _repository;
        public CollectionCenterService(ICollectionCenterRepository repo)
        {
            _repository = repo;
        }

        public async Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId)
        {
            return await _repository.GetRevenuesByYear(collectionCenterId);
        }

        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(
            int collectionCenterId,
            int year        
        )
        {
            return await _repository.GetRevenuesByQuarter(collectionCenterId, year);
        }

        public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
        {
            return await _repository.GetRevenuesByMonth(collectionCenterId, year);
        }

        public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
        {
            return await _repository.GetRevenuesByWeek(collectionCenterId, year);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesByMonth(
            int collectionCenterId,
            int year,
            string monthName
        )
        {
            return await _repository.GetCropRevenuesByMonth(collectionCenterId, year, monthName);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesByQuarter(
            int collectionCenterId,
            int year,
            int quarterNumber
        )
        {
            return await _repository.GetCropRevenuesByQuarter(collectionCenterId, year, quarterNumber);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year)
        {
            return await _repository.GetCropRevenuesByYear(collectionCenterId, year);
        }

        public async Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
            int collectionCenterId,
            string startDate,
            string endDate
        )
        {
            return await _repository.GetCropRevenuesBetweenDates(collectionCenterId, startDate, endDate);
        }

        public async Task<List<int>> GetYearsForCropRevenues(int collectionCenterId)
        {
            return await _repository.GetYearsForCropRevenues(collectionCenterId);
        }


    }
}
