using BIService.Models;
namespace BIService.Repositories.Interfaces;
public interface ITransporterRepository
{
    Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId,int year);
    Task<List<int>> GetYears();
}