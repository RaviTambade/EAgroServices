using BIService.Services.Interfaces;
using BIService.Repositories.Interfaces;
using BIService.Models;

namespace BIService.Services
{
    public class FarmerService : IFarmerService
    {
        private readonly IFarmerRepository _repo;

        public FarmerService(IFarmerRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<YearRevenue>> GetRevenuesByYear(int farmerId)
        {
            return await _repo.GetRevenuesByYear(farmerId);
        }
         public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int farmerId, int year)
        {
            return await _repo.GetRevenuesByQuarter(farmerId, year);
        }
         public async Task<List<MonthRevenue>> GetRevenuesByMonth(int farmerId, int year)
        {
            return await _repo.GetRevenuesByMonth(farmerId, year);
        }

         public async Task<List<WeekRevenue>> GetRevenuesByWeek(int farmerId, int year)
        {
            return await _repo.GetRevenuesByWeek(farmerId, year);
        }
        }
        }