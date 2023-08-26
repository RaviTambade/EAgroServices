using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Repositories.Interfaces;
public interface ITransporterRepository
{
    Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year);
    Task<List<YearRevenue>> GetRevenueByYear(int transporterId);
    Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId, int year);
    Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year);
    Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId, int year);
    Task<List<int>> GetYears(int transporterId);
}