using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Services.Interfaces;
namespace Transflower.EAgroServices.BIService.Services;
public class TransporterService : ITransporterService
{
    public readonly ITransporterRepository _repo;
    public TransporterService(ITransporterRepository repo)
    {
        _repo = repo;
    }
    public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year) =>
    await _repo.GetRevenuesByYear(transporterId, year);
    public async Task<List<int>> GetYears(int transporterId) => await _repo.GetYears(transporterId);
    public async Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId, int year) =>
    await _repo.GetMonthlyRevenue(transporterId, year);
    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year) =>
    await _repo.GetRevenuesByQuarter(transporterId, year);
    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId, int year) =>
    await _repo.GetRevenuesByWeek(transporterId, year);
    public async Task<List<YearRevenue>> GetRevenueByYear(int transporterId) =>
    await _repo.GetRevenueByYear(transporterId);
}

