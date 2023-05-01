using PurchaseAPI.Models;
using PurchaseAPI.Repositories.Interfaces;
using PurchaseAPI.Services.Interfaces;

namespace PurchaseAPI.Repositories;

public class PurchaseService : IPurchaseService
{
    private readonly IPurchaseRepository _repo;

    public PurchaseService(IPurchaseRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<PurchaseViewModel>> GetAllPurchaseItems()
    {
        return await _repo.GetAllPurchaseItems();
    }

    public async Task<PurchaseViewModel> GetPurchaseItemById(int purchaseId)
    {
        return await _repo.GetPurchaseItemById(purchaseId);
    }

      public async Task<bool> Insert(PurchaseItem purchaseItem)
    {
        return await _repo.Insert(purchaseItem);
    }
    public async Task<bool> Update(int purchaseId,PurchaseItem purchaseItem)
    {
        return await _repo.Update(purchaseId,purchaseItem);
    }
    public async Task<bool> Delete(int purchaseId)
    {
        return await _repo.Delete(purchaseId);
    }

}