using PurchasedItemsAPI.Models;

namespace PurchasedItemsAPI.Repositories.Interfaces;
public interface IPurchasedItemRepository
{

    List<PurchasedItem> GetAllPurchasedItems();


}