using BIService.Models;
namespace BIService.Repositories.Interfaces;
public interface ITransporterRepository
{
    Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year);
    // Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId);
    Task<List<int>> GetYears(int transporterId);
}