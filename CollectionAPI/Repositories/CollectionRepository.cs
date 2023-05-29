using System.Globalization;
using Microsoft.EntityFrameworkCore;
using CollectionAPI.Contexts;
using CollectionAPI.Models;
using CollectionAPI.Repositories.Interfaces;
namespace CollectionAPI.Repositories;
public class CollectionRepository : ICollectionRepository
{
    private readonly IConfiguration _configuration;
    public CollectionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }


    

    // public async Task<List<PurchaseViewModel>> GetAllPurchaseItems()
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             var purchaseViewData = await (from item in context.PurchaseItems
    //                                           join bill in context.PurchaseBillings
    //                                           on item.Id equals bill.PurchaseId
    //                                           join farmer in context.Farmers
    //                                           on item.FarmerId equals farmer.Id
    //                                           join variety in context.Varieties
    //                                           on item.VarietyId equals variety.Id
    //                                           select new PurchaseViewModel()
    //                                           {
    //                                               PurchaseItem = item,
    //                                               PurchaseBilling = bill,
    //                                               FarmerName = farmer.FirstName + " " + farmer.LastName,
    //                                               VarietyName = variety.VarietyName
    //                                           }).ToListAsync();
    //             return purchaseViewData;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<PurchaseViewModel> GetPurchaseItemById(int purchaseId)
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             PurchaseViewModel? purchaseViewData = await (from item in context.PurchaseItems
    //                                                          join bill in context.PurchaseBillings
    //                                                          on item.Id equals bill.PurchaseId
    //                                                          join farmer in context.Farmers
    //                                                          on item.FarmerId equals farmer.Id
    //                                                          join variety in context.Varieties
    //                                                          on item.VarietyId equals variety.Id
    //                                                          where item.Id == purchaseId
    //                                                          select new PurchaseViewModel()
    //                                                          {
    //                                                              PurchaseItem = item,
    //                                                              PurchaseBilling = bill,
    //                                                              FarmerName = farmer.FirstName + " " + farmer.LastName,
    //                                                              VarietyName = variety.VarietyName
    //                                                          }).FirstOrDefaultAsync();
    //             return purchaseViewData;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }


    // public async Task<bool> Insert(PurchaseItem purchaseItem)
    // {
    //     bool status = false;
    //     PurchaseBilling purchaseBilling = new PurchaseBilling();
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             await context.PurchaseItems.AddAsync(purchaseItem);
    //             await context.SaveChangesAsync();
    //             purchaseBilling.PurchaseId = purchaseItem.Id;
    //             await context.PurchaseBillings.AddAsync(purchaseBilling);
    //             await context.SaveChangesAsync();
    //             int billId = purchaseBilling.Id;
    //             context.Database.ExecuteSqlRaw("CALL calculate_purchase_labour_charges(@p0)", billId);
    //             context.Database.ExecuteSqlRaw("CALL calculate_purchase_total_amount(@p0)", billId);
    //             status = true;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     return status;
    // }

    // public async Task<bool> Update(int purchaseId, PurchaseItem purchaseItem)
    // {
    //     bool status = false;
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             PurchaseItem? oldPurchaseItem = await context.PurchaseItems.FindAsync(purchaseId);

    //             string containerType = oldPurchaseItem.ContainerType;
    //             int quantity = oldPurchaseItem.Quantity;
    //             double tareWeight = oldPurchaseItem.TareWeight;
    //             double totalWeight = oldPurchaseItem.TotalWeight;
    //             double ratePerKg = oldPurchaseItem.RatePerKg;

    //             if (oldPurchaseItem != null)
    //             {
    //                 oldPurchaseItem.FarmerId = purchaseItem.FarmerId;
    //                 oldPurchaseItem.VarietyId = purchaseItem.VarietyId;
    //                 oldPurchaseItem.ContainerType = purchaseItem.ContainerType;
    //                 oldPurchaseItem.Quantity = purchaseItem.Quantity;
    //                 oldPurchaseItem.Grade = purchaseItem.Grade;
    //                 oldPurchaseItem.TareWeight = purchaseItem.TareWeight;
    //                 oldPurchaseItem.TotalWeight = purchaseItem.TotalWeight;
    //                 oldPurchaseItem.RatePerKg = purchaseItem.RatePerKg;
    //                 await context.SaveChangesAsync();
    //                 status = true;

    //                 if (
    //                       containerType != oldPurchaseItem.ContainerType ||
    //                       quantity != oldPurchaseItem.Quantity ||
    //                       tareWeight != oldPurchaseItem.TareWeight ||
    //                       totalWeight != oldPurchaseItem.TotalWeight ||
    //                       ratePerKg != oldPurchaseItem.RatePerKg
    //                     )
    //                 {
    //                     Console.WriteLine(" procedure called");
    //                     var purchaseBilling = await context.PurchaseBillings.FirstOrDefaultAsync(x => x.PurchaseId == purchaseId);
    //                     int billId = purchaseBilling.Id;
    //                     Console.WriteLine(billId);
    //                     context.Database.ExecuteSqlRaw("CALL calculate_purchase_labour_charges(@p0)", billId);
    //                     context.Database.ExecuteSqlRaw("CALL calculate_purchase_total_amount(@p0)", billId);
    //                 }
    //             }
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     return status;

    // }
    // public async Task<bool> Delete(int purchaseId)
    // {
    //     bool status = false;
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             PurchaseItem purchaseItem = await context.PurchaseItems.FindAsync(purchaseId);
    //             if (purchaseItem != null)
    //             {
    //                 context.PurchaseItems.Remove(purchaseItem);
    //                 await context.SaveChangesAsync();
    //                 status = true;
    //             }
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     return status;
    // }

    // public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int farmerId)
    // {

    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             List<PurchaseViewModel>? purchaseData = await (from item in context.PurchaseItems
    //                                                            join bill in context.PurchaseBillings
    //                                                            on item.Id equals bill.PurchaseId
    //                                                            join farmer in context.Farmers
    //                                                            on item.FarmerId equals farmer.Id
    //                                                            join variety in context.Varieties
    //                                                            on item.VarietyId equals variety.Id
    //                                                            where item.FarmerId == farmerId orderby item.Date descending
    //                                                            select new PurchaseViewModel()
    //                                                            {
    //                                                                PurchaseItem = item,
    //                                                                PurchaseBilling = bill,
    //                                                                FarmerName = farmer.FirstName + " " + farmer.LastName,
    //                                                                VarietyName = variety.VarietyName
    //                                                            } ).ToListAsync();
    //             return purchaseData;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }
    // public async Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int farmerId)
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration)) //Disposal Technique
    //         {
    //             var results = await (from billing in context.PurchaseBillings
    //                                  join purchase in context.PurchaseItems
    //                                  on billing.PurchaseId equals purchase.Id
    //                                  where purchase.FarmerId == farmerId
    //                                  group billing by new { billing.Date.Year, billing.Date.Month } into billingGroup
    //                                  select new FarmerSellMonth()
    //                                  {
    //                                      Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(billingGroup.Key.Month),
    //                                      Year = billingGroup.Key.Year,
    //                                      TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
    //                                  }).ToListAsync();
    //             return results;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId)
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             var varityData = await (from billing in context.PurchaseBillings
    //                                     join purchase in context.PurchaseItems
    //                                     on billing.PurchaseId equals purchase.Id
    //                                     join variety in context.Varieties
    //                                     on purchase.VarietyId equals variety.Id
    //                                     where purchase.FarmerId == farmerId
    //                                     group billing by new { billing.Date.Year, variety.VarietyName } into billingGroup
    //                                     select new FarmerSellVariety()
    //                                     {
    //                                         Variety = billingGroup.Key.VarietyName,
    //                                         Year = billingGroup.Key.Year,
    //                                         TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
    //                                     }).ToListAsync();
    //             return varityData;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }
    // public async Task<int> GetFarmerSellTotalAmount(int farmerId)
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration)) //Disposal Technique
    //         {
    //             var amount = await (from billing in context.PurchaseBillings
    //                                 join purchase in context.PurchaseItems
    //                                 on billing.PurchaseId equals purchase.Id
    //                                 where purchase.FarmerId == farmerId
    //                                 group billing by purchase.FarmerId into g
    //                                 select g.Sum(bill => bill.TotalAmount)).FirstOrDefaultAsync();
    //             return amount;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<List<FarmerOrder>> GetFarmerOrdersPerMonth(int farmerId)
    // {
    //     try
    //     {
    //         using (var context = new PurchaseContext(_configuration))
    //         {
    //             var farmerOrdersCount = await (from purchase in context.PurchaseItems
    //                                            where purchase.FarmerId == farmerId
    //                                            group purchase by new { purchase.Date.Year, purchase.Date.Month } into billingGroup
    //                                            select new FarmerOrder()
    //                                            {
    //                                                Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(billingGroup.Key.Month),
    //                                                Year = billingGroup.Key.Year,
    //                                                OrderCount = billingGroup.Count()
    //                                            }).ToListAsync();

    //             return farmerOrdersCount;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

}

