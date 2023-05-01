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

    public async Task<List<PurchaseViewModel>> GetAllPurchaseItems()
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                var purchaseViewData = from item in context.PurchaseItems
                                       join bill in context.PurchaseBillings
                                       on item.PurchaseId equals bill.PurchaseId
                                       select new PurchaseViewModel()
                                       {
                                        PurchaseItem=item,
                                        PurchaseBilling=bill
                                       };
                return await  purchaseViewData.ToListAsync();
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }


       public async Task<PurchaseViewModel> GetPurchaseItemById(int purchaseId)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                var purchaseViewData = from item in context.PurchaseItems
                                       join bill in context.PurchaseBillings
                                       on item.PurchaseId equals bill.PurchaseId
                                       where item.PurchaseId==purchaseId
                                       select new PurchaseViewModel()
                                       {
                                        PurchaseItem=item,
                                        PurchaseBilling=bill
                                       };
                return await  purchaseViewData.FirstOrDefaultAsync();
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
        PurchaseBilling purchaseBilling = new PurchaseBilling();
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                await context.PurchaseItems.AddAsync(purchaseItem);
                await context.SaveChangesAsync();
                Console.WriteLine(purchaseItem.PurchaseId);
                purchaseBilling.PurchaseId = purchaseItem.PurchaseId;
                await context.PurchaseBillings.AddAsync(purchaseBilling);
                await context.SaveChangesAsync();
                int billId = purchaseBilling.BillId;
                Console.WriteLine(billId);
                context.Database.ExecuteSqlRaw("CALL calculate_purchase_labour_charges(@p0)", billId);
                context.Database.ExecuteSqlRaw("CALL calculate_purchase_total_amount(@p0)", billId);
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

                string containerType = oldPurchaseItem.ContainerType;
                int quantity = oldPurchaseItem.Quantity;
                double tareWeight = oldPurchaseItem.TareWeight;
                double totalWeight = oldPurchaseItem.TotalWeight;
                double ratePerKg = oldPurchaseItem.RatePerKg;

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
                    status = true;

                    if (
                          containerType != oldPurchaseItem.ContainerType ||
                          quantity != oldPurchaseItem.Quantity ||
                          tareWeight != oldPurchaseItem.TareWeight ||
                          totalWeight != oldPurchaseItem.TotalWeight ||
                          ratePerKg != oldPurchaseItem.RatePerKg
                        )
                    {
                        Console.WriteLine(" procedure called");
                        var purchaseBilling = await context.PurchaseBillings.FirstOrDefaultAsync(x => x.PurchaseId == purchaseId);
                        int billId = purchaseBilling.BillId;
                        Console.WriteLine(billId);
                        context.Database.ExecuteSqlRaw("CALL calculate_purchase_labour_charges(@p0)", billId);
                        context.Database.ExecuteSqlRaw("CALL calculate_purchase_total_amount(@p0)", billId);
                    }
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