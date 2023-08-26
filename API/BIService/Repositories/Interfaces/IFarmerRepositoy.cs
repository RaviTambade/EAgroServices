using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Repositories.Interfaces;
public interface IFarmerRepository
{
    Task<List<YearRevenue>> GetRevenuesByYear(int FarmerId);
    Task<List<QuarterRevenue>> GetRevenuesByQuarter(int FarmerId, int year);
    Task<List<MonthRevenue>> GetRevenuesByMonth(int FarmerId, int year);
    Task<List<WeekRevenue>> GetRevenuesByWeek(int FarmerId, int year);
}
