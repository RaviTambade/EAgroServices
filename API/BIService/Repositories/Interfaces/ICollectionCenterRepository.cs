
using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId);
        Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId,int year );
        Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId,int year );
        Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId,int year );
        // Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId);
        // Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId);
    }
}