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
                var purchaseViewData = await (from item in context.PurchaseItems
                                              join bill in context.PurchaseBillings
                                              on item.PurchaseId equals bill.PurchaseId
                                              join farmer in context.Farmers
                                              on item.FarmerId equals farmer.FarmerId
                                              join variety in context.Varieties
                                              on item.VarietyId equals variety.VarietyId
                                              select new PurchaseViewModel()
                                              {
                                                  PurchaseItem = item,
                                                  PurchaseBilling = bill,
                                                  FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                  VarietyName = variety.VarietyName
                                              }).ToListAsync();
                return purchaseViewData;
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
                PurchaseViewModel? purchaseViewData = await (from item in context.PurchaseItems
                                                             join bill in context.PurchaseBillings
                                                             on item.PurchaseId equals bill.PurchaseId
                                                             join farmer in context.Farmers
                                                             on item.FarmerId equals farmer.FarmerId
                                                             join variety in context.Varieties
                                                             on item.VarietyId equals variety.VarietyId
                                                             where item.PurchaseId == purchaseId
                                                             select new PurchaseViewModel()
                                                             {
                                                                 PurchaseItem = item,
                                                                 PurchaseBilling = bill,
                                                                 FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                                 VarietyName = variety.VarietyName
                                                             }).FirstOrDefaultAsync();
                return purchaseViewData;
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
                purchaseBilling.PurchaseId = purchaseItem.PurchaseId;
                await context.PurchaseBillings.AddAsync(purchaseBilling);
                await context.SaveChangesAsync();
                int billId = purchaseBilling.BillId;
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
                    oldPurchaseItem.VarietyId = purchaseItem.VarietyId;
                    oldPurchaseItem.ContainerType = purchaseItem.ContainerType;
                    oldPurchaseItem.Quantity = purchaseItem.Quantity;
                    oldPurchaseItem.Grade = purchaseItem.Grade;
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

    public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int farmerId)
    {

        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                List<PurchaseViewModel>? purchaseData = await (from item in context.PurchaseItems
                                                               join bill in context.PurchaseBillings
                                                               on item.PurchaseId equals bill.PurchaseId
                                                               join farmer in context.Farmers
                                                               on item.FarmerId equals farmer.FarmerId
                                                               join variety in context.Varieties
                                                               on item.VarietyId equals variety.VarietyId
                                                               where item.FarmerId == farmerId
                                                               select new PurchaseViewModel()
                                                               {
                                                                   PurchaseItem = item,
                                                                   PurchaseBilling = bill,
                                                                   FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                                   VarietyName = variety.VarietyName
                                                               }).ToListAsync();
                return purchaseData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<PurchaseViewModel>> GetPurchaseByVariety(int varietyId)
    {

        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                List<PurchaseViewModel>? purchaseData = await (from item in context.PurchaseItems
                                                               join bill in context.PurchaseBillings
                                                               on item.PurchaseId equals bill.PurchaseId
                                                               join farmer in context.Farmers
                                                               on item.FarmerId equals farmer.FarmerId
                                                               join variety in context.Varieties
                                                               on item.VarietyId equals variety.VarietyId
                                                               where item.VarietyId == varietyId
                                                               select new PurchaseViewModel()
                                                               {
                                                                   PurchaseItem = item,
                                                                   PurchaseBilling = bill,
                                                                   FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                                   VarietyName = variety.VarietyName
                                                               }).ToListAsync();
                return purchaseData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<PurchaseViewModel>> GetPurchaseByGrade(string grade)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                List<PurchaseViewModel>? purchaseData = await (from item in context.PurchaseItems
                                                               join bill in context.PurchaseBillings
                                                               on item.PurchaseId equals bill.PurchaseId
                                                               join farmer in context.Farmers
                                                               on item.FarmerId equals farmer.FarmerId
                                                               join variety in context.Varieties
                                                               on item.VarietyId equals variety.VarietyId
                                                               where item.Grade == grade
                                                               select new PurchaseViewModel()
                                                               {
                                                                   PurchaseItem = item,
                                                                   PurchaseBilling = bill,
                                                                   FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                                   VarietyName = variety.VarietyName
                                                               }).ToListAsync();
                return purchaseData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<PurchaseViewModel>> GetPurchaseByVarietyAndGrade(int varirtyId, string grade)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                List<PurchaseViewModel>? purchaseData = await (from item in context.PurchaseItems
                                                               join bill in context.PurchaseBillings
                                                               on item.PurchaseId equals bill.PurchaseId
                                                               join farmer in context.Farmers
                                                               on item.FarmerId equals farmer.FarmerId
                                                               join variety in context.Varieties
                                                               on item.VarietyId equals variety.VarietyId
                                                               where item.VarietyId == varirtyId && item.Grade == grade
                                                               select new PurchaseViewModel()
                                                               {
                                                                   PurchaseItem = item,
                                                                   PurchaseBilling = bill,
                                                                   FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                                   VarietyName = variety.VarietyName
                                                               }).ToListAsync();
                return purchaseData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }


    public async Task<List<FarmerSell>> FarmerSellTotalAmountByMonth(int farmerId)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration)) //Disposal Technique
            {
                var results = await (from billing in context.PurchaseBillings
                                     join purchase in context.PurchaseItems
                                 on billing.PurchaseId equals purchase.PurchaseId
                                     where purchase.FarmerId == farmerId
                                     group billing by purchase.Date.Month into billingGroup
                                     select new FarmerSell()
                                     {
                                         TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
                                         Month =billingGroup.Key
                                     }).ToListAsync();
                return results;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}

