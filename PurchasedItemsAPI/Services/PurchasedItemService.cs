

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
    public List<PurchasedItem> GetAllPurchasedItems()
    {
        return _repository.GetAllPurchasedItems();
    }


}