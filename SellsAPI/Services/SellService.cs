using SellsAPI.Models;
using SellsAPI.Repositories.Interfaces;
using SellsAPI.Services.Interfaces;

namespace SellsAPI.Services;

public class SellService : ISellService
{
    private readonly ISellRepository _repo;

    public SellService(ISellRepository repo)
    {
        this._repo = repo;
    }

    public async Task<List<SellBillingView>> GetAll() => await _repo.GetAll();

    public async Task<Sell> GetById(int sellId) => await _repo.GetById(sellId);

    public async Task<bool> Insert(Sell sell, FreightRate freightRate) =>
        await _repo.Insert(sell, freightRate);

    public async Task<bool> Delete(int sellId) => await _repo.Delete(sellId);

    public async Task<bool> Update(int sellId, Sell sell, FreightRate freightRate) =>
        await _repo.Update(sellId, sell, freightRate);

    public async Task<List<MerchantSell>> GetSellByMerchantId(int merchantId) =>
        await _repo.GetSellByMerchantId(merchantId);

    public async Task<List<TruckBilling>> GetTruckBillingsByTruckId(int truckId) =>
        await _repo.GetTruckBillingsByTruckId(truckId);

    public async Task<List<MerchantRevenue>> GetMerchantRevenues(int merchantId) =>
        await _repo.GetMerchantRevenues(merchantId);

    public async Task<double> GetTotalPurchaseAmountOfMerchant(int merchantId) =>
        await _repo.GetTotalPurchaseAmountOfMerchant(merchantId);

    public async Task<List<MerchantOrder>> GetTotalPurchaseOrdersCount(int merchantId) =>
        await _repo.GetTotalPurchaseOrdersCount(merchantId);
}
