
using PurchasedItemsAPI.Context;
using PurchasedItemsAPI.Models;
using PurchasedItemsAPI.Repositories.Interfaces;

namespace PurchasedItemsAPI.Repositories;

public class PurchasedItemRepository : IPurchasedItemRepository
{
    public List<PurchasedItem> GetAllPurchasedItems()
    {
        try
        {
            using (var context = new PurchasedItemContext())
            {
                var purchasedItems = context.PurchasedItems.ToList();
                foreach (var item in purchasedItems)
                {
                    Console.WriteLine(item.PurchaseId);
                }
                return purchasedItems;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }
}