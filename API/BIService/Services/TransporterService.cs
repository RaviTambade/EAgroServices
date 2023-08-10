using BIService.Models;
using BIService.Repositories.Interfaces;
using BIService.Repositories;
using BIService.Services.Interfaces;
namespace BIService.Services;
public class TransporterService{
    public readonly ITransporterRepository _repo;
    public TransporterService(ITransporterRepository repo){
        _repo=repo;
    }
    public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId,int year)=>
    await _repo.GetRevenuesByYear(transporterId,year);
}