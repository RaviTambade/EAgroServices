using BIService.Models;
using BIService.Repositories.Interfaces;
using BIService.Repositories;
using BIService.Services.Interfaces;
namespace BIService.Services;
public class TransporterService:ITransporterService{
    public readonly ITransporterRepository _repo;
    public TransporterService(ITransporterRepository repo){
        _repo=repo;
    }
    public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId,int year)=>
    await _repo.GetRevenuesByYear(transporterId,year);
    public async  Task<List<int>> GetYears(int transporterId)=>await _repo.GetYears(transporterId);
    public async Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId,int year)=>
    await _repo.GetMonthlyRevenue(transporterId,year);
    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year)=>
    await _repo.GetRevenuesByQuarter(transporterId,year);
}

