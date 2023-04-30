using Microsoft.EntityFrameworkCore;
using PurchaseAPI.Contexts;
using PurchaseAPI.Models;
using PurchaseAPI.Repositories.Interfaces;
namespace PurchaseAPI.Repositories;

public class PurchaseRepository : IPurchaseRepository
{
    private readonly IConfiguration _configuration;
    public PurchaseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<PurchaseItem>> GetAllPurchaseItems()
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                List<PurchaseItem> purchaseItems = await context.PurchaseItems.ToListAsync();
                if (purchaseItems == null)
                {
                    return null;
                }
                return purchaseItems;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }


    public async Task<PurchaseItem> GetPurchaseItemById(int purchaseId)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                PurchaseItem purchaseItem = await context.PurchaseItems.FindAsync(purchaseId);
                if (purchaseItem == null)
                {
                    return null;
                }
                return purchaseItem;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> Insert(PurchaseItem purchaseItem)
    {
        bool status = false;
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                await context.PurchaseItems.AddAsync(purchaseItem);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

     public async Task<bool> Update(int purchaseId, PurchaseItem purchaseItem)
    {
        bool status = false;
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                PurchaseItem? oldPurchaseItem = await context.PurchaseItems.FindAsync(purchaseId);
                if (oldPurchaseItem != null)
                {
                    oldPurchaseItem.FarmerId = purchaseItem.FarmerId;
                    oldPurchaseItem.Variety = purchaseItem.Variety;
                    oldPurchaseItem.ContainerType = purchaseItem.ContainerType;
                    oldPurchaseItem.Quantity = purchaseItem.Quantity;
                    oldPurchaseItem.TareWeight = purchaseItem.TareWeight;
                    oldPurchaseItem.TotalWeight = purchaseItem.TotalWeight;
                    oldPurchaseItem.RatePerKg = purchaseItem.RatePerKg;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;

    }
    public async Task<bool> Delete(int purchaseId)
    {
        bool status = false;
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                PurchaseItem purchaseItem = await context.PurchaseItems.FindAsync(purchaseId);
                if (purchaseItem != null)
                {
                    context.PurchaseItems.Remove(purchaseItem);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
}