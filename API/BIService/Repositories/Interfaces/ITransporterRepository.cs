using BIService.Models;
namespace BIService.Repositories.Interfaces;
public interface ITransporterRepository
{
    Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year);
    Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId,int year);
    Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId,int year );
    Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId,int year );
    Task<List<int>> GetYears(int transporterId);
}