using PurchasedItemsAPI.Models;
using PurchasedItemsAPI.Repositories.Interfaces;
using PurchasedItemsAPI.Services.Interfaces;
namespace PurchasedItemsAPI.Services;
public class PurchasedItemService : IPurchasedItemService
{
    private readonly IPurchasedItemRepository _repository;
    public PurchasedItemService(IPurchasedItemRepository repository)
    {
        this._repository = repository;
    }
    public async Task<List<PurchasedItem>> GetAllPurchasedItems()=>await _repository.GetAllPurchasedItems();
    public async Task<PurchasedItem> GetPurchasedItem(int purchaseId)=>await _repository.GetPurchasedItem(purchaseId);
    public async Task<bool> Insert(PurchasedItem purchasedItem)=>await _repository.Insert(purchasedItem);
    public async Task<bool> Update(int purchaseId, PurchasedItem purchasedItem)=>await _repository.Update(purchaseId,purchasedItem);
   public async Task<bool> Delete(int purchaseId)=>await _repository.Delete(purchaseId);
}