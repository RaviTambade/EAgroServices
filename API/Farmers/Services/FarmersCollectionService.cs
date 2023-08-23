using Farmers.Services.Interfaces;
using Farmers.Repositories.Interfaces;
using Farmers.Models;

namespace Farmers.Services
{
    public class GoodsCollectionService : IGoodsCollectionService
    {
        private readonly IFarmersCollectionRepository _repo;

        public GoodsCollectionService(IFarmersCollectionRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
        {
            return await _repo.FarmerCollection(farmerId);
        }

        public async Task<List<FarmerCollection>> GetVerifiedCollection(
            int farmerId,
            string paymentStatus
        )
        {
            return await _repo.GetVerifiedCollection(farmerId, paymentStatus);
        }

        public async Task<List<FarmerCollection>> VerifiedCollection(int farmerId)
        {
            return await _repo.VerifiedCollection(farmerId);
        }

        public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
        {
            return await _repo.GetUnverifiedCollectionsOfFarmer(farmerId);
        }

        public async Task<List<Revenue>> MonthlyRevenue(int farmerId)
        {
            return await _repo.MonthlyRevenue(farmerId);
        }

        public async Task<List<Revenue>> YearRevenue(int farmerId)
        {
            return await _repo.YearRevenue(farmerId);
        }

        public async Task<List<CropRevenue>> CropRevenue(int farmerId)
        {
            return await _repo.CropRevenue(farmerId);
        }
    }
}
