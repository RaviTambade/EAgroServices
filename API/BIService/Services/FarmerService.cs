using Transflower.EAgroServices.BIService.Services.Interfaces;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Services;
public class FarmerService : IFarmerService
{
    private readonly IFarmerRepository _repository;
    public FarmerService(IFarmerRepository repo)
    {
        _repository = repo;
    }
    public async Task<List<YearRevenue>> GetRevenuesByYear(int farmerId)
    {
        return await _repository.GetRevenuesByYear(farmerId);
    }
    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int farmerId, int year)
    {
        return await _repository.GetRevenuesByQuarter(farmerId, year);
    }
    public async Task<List<MonthRevenue>> GetRevenuesByMonth(int farmerId, int year)
    {
        return await _repository.GetRevenuesByMonth(farmerId, year);
    }

    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int farmerId, int year)
    {
        return await _repository.GetRevenuesByWeek(farmerId, year);
    }
}
