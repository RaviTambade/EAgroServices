
using SellsAPI.Models;
namespace SellsAPI.Repositories.Interfaces;
public interface ISellRepository
{
    Task<List<SellBillingView>> GetAll();
    Task<Sell> GetById(int sellId);
    Task<bool> Insert(Sell sell,FreightRate freightRate);
    Task<bool> Update(int sellId,Sell sell,FreightRate freightRate);
    Task<bool> Delete(int sellId);
    Task<List<MerchantSell>> GetSellByMerchantId(int merchantId);
    Task<List<TruckBilling>> GetTruckBillingsByTruckId(int truckId);
    Task<List<MerchantRevenue>> GetMerchantRevenues(int merchantId);
    Task<double> GetTotalPurchaseAmountOfMerchant(int merchantId);
    Task<List<MerchantOrder>> GetTotalPurchaseOrdersCount(int merchantId);

}