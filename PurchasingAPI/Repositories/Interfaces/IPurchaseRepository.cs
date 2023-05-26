using System.Collections.Generic;
using System.Threading.Tasks;
using PurchasingAPI.Models;

namespace PurchasingAPI.Repositories.Interfaces;
public interface IPurchaseRepository
{
    // Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int farmerId);
    // Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int farmerId);
    // Task<int> GetFarmerSellTotalAmount(int farmerId);
    Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId,int varietyId);
   // Task<List<FarmerOrder>> GetFarmerOrdersPerMonth(int farmerId);

}