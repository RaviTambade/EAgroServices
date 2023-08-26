using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Repositories.Interfaces;
public interface ICollectionCenterRepository
{
    Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId);
    Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId, int year);
    Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year);
    Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year);
    Task<List<CropRevenue>> GetCropRevenuesByMonth(
        int collectionCenterId,
        int year,
        string monthName
    );
    Task<List<CropRevenue>> GetCropRevenuesByQuarter(
        int collectionCenterId,
        int year,
        int quarterNumber
    );
    Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year);
    Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
        int collectionCenterId,
        string startDate,
        string endDate
    );
    Task<List<int>> GetYearsForCropRevenues(int collectionCenterId);
}
