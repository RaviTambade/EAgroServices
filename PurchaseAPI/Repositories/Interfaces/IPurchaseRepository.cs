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
}