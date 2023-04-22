using PurchasedItemsAPI.Models;
namespace PurchasedItemsAPI.Repositories.Interfaces;
public interface IPurchasedItemRepository
{
    Task<List<PurchasedItem>> GetAllPurchasedItems();
    Task<PurchasedItem> GetPurchasedItem(int purchaseId);
    Task<bool> Insert(PurchasedItem purchasedItem);
    Task<bool> Update(int purchaseId ,PurchasedItem purchasedItem);
    Task<bool> Delete(int purchaseId);


}