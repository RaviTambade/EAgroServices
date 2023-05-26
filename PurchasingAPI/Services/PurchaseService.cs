using PurchasingAPI.Models;
using PurchasingAPI.Repositories.Interfaces;
using PurchasingAPI.Services.Interfaces;

namespace PurchasingAPI.Repositories;

public class PurchaseService : IPurchaseService
{
    private readonly IPurchaseRepository _repo;

    public PurchaseService(IPurchaseRepository repo)
    {
        _repo = repo;
    }

    // public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int farmerId)
    // {
    //     return await _repo.GetFarmerPurchaseDetails(farmerId);
    // }

    // public async Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int farmerId)
    // {
    //     return await _repo.FarmerSellTotalAmountByMonth(farmerId);
    // }

    // public async Task<int> GetFarmerSellTotalAmount(int farmerId)
    // {
    //     return await _repo.GetFarmerSellTotalAmount(farmerId);
    // }

    public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId,int varietyId)
    {
       return await _repo.GetFarmerSellByVariety(farmerId,varietyId);
    }

    // public async Task<List<FarmerOrder>> GetFarmerOrdersPerMonth(int farmerId)
    // {
    //           return await _repo.GetFarmerOrdersPerMonth(farmerId);
    // }
}