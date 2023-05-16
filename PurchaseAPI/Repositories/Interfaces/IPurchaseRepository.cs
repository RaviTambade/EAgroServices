using System.Collections.Generic;
using System.Threading.Tasks;
using PurchaseAPI.Models;

namespace PurchaseAPI.Repositories.Interfaces;
public interface IPurchaseRepository
{
    Task<List<PurchaseViewModel>> GetAllPurchaseItems();
    Task<PurchaseViewModel> GetPurchaseItemById(int purchaseId);
    Task<bool> Insert(PurchaseItem purchaseItem);
    Task<bool> Update(int purchaseId, PurchaseItem purchaseItem);
    Task<bool> Delete(int purchaseId);
    Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int farmerId);
    Task<List<PurchaseViewModel>> GetPurchaseByVariety(int varietyId);
    Task<List<PurchaseViewModel>> GetPurchaseByGrade(string grade);
    Task<List<PurchaseViewModel>> GetPurchaseByVarietyAndGrade(int varirtyId,string grade);
     Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int farmerId);
     Task<int> GetFarmerSellTotalAmount(int farmerId);
    Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId);



}