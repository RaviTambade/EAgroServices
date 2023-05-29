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

    public async Task<List<CollectionBillingRecord>> GetCollectionBillingRecords()
    {
        try
        {
            using (var context = new CollectionContext(_configuration))
            {
                var collectionBillingRecords = await (
                    from collection in context.Collections
                    join bill in context.Billings on collection.Id equals bill.CollectionId
                    join farmer in context.Farmers on collection.FarmerId equals farmer.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    select new CollectionBillingRecord()
                    {
                        Collection = collection,
                        Billing = bill,
                        FarmerName = farmer.FirstName + " " + farmer.LastName,
                        Crop = crop.Title
                    }
                ).ToListAsync();
                System.Console.WriteLine(collectionBillingRecords.Count);
                return collectionBillingRecords;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<CollectionBillingRecord> GetCollectionBillingRecord(int collectionId)
    {
        try
        {
            using (var context = new CollectionContext(_configuration))
            {
                var collectionBillingRecord = await (
                    from collection in context.Collections
                    join bill in context.Billings on collection.Id equals bill.CollectionId
                    join farmer in context.Farmers on collection.FarmerId equals farmer.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where collection.Id == collectionId
                    select new CollectionBillingRecord()
                    {
                        Collection = collection,
                        Billing = bill,
                        FarmerName = farmer.FirstName + " " + farmer.LastName,
                        Crop = crop.Title
                    }
                ).FirstOrDefaultAsync();
                return collectionBillingRecord;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> Insert(Collection collection)
    {
        bool FarmerExists = await IsUserFarmer(collection.FarmerId);
        if (!FarmerExists)
        {
            System.Console.WriteLine("--> user is not farmer");
            return false;
        }

        bool status = false;
        Billing Billing = new Billing();
        try
        {
            using (var context = new CollectionContext(_configuration))
            {
                await context.Collections.AddAsync(collection);
                await context.SaveChangesAsync();
                Billing.CollectionId = collection.Id;
                await context.Billings.AddAsync(Billing);
                await context.SaveChangesAsync();
                int billId = Billing.Id;
                context.Database.ExecuteSqlRaw("CALL ApplyLabourCharges(@p0)", billId);
                context.Database.ExecuteSqlRaw("CALL DeductLabourChargesFromRevenue(@p0)", billId);
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    private async Task<bool> IsUserFarmer(int farmerId)
    {
        try
        {
            using (var context = new CollectionContext(_configuration))
            {
                var farmerCount = await (
                    from farmer in context.Farmers
                    join userRole in context.UserRoles on farmer.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "farmer" && farmer.Id == farmerId
                    select farmer
                ).CountAsync();
                if (farmerCount == 1)
                {
                    return true;
                }
                return false;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    // public async Task<bool> Update(int collectionId, Collection Collection)
    // {
    //     bool status = false;
    //     try
    //     {
    //         using (var context = new CollectionContext(_configuration))
    //         {
    //             Collection? oldPurchaseItem = await context.Collections.FindAsync(collectionId);

    //             string containerType = oldPurchaseItem.ContainerType;
    //             int quantity = oldPurchaseItem.Quantity;
    //             double tareWeight = oldPurchaseItem.TareWeight;
    //             double totalWeight = oldPurchaseItem.TotalWeight;
    //             double ratePerKg = oldPurchaseItem.RatePerKg;

    //             if (oldPurchaseItem != null)
    //             {
    //                 oldPurchaseItem.FarmerId = Collection.FarmerId;
    //                 oldPurchaseItem.CropId = Collection.CropId;
    //                 oldPurchaseItem.ContainerType = Collection.ContainerType;
    //                 oldPurchaseItem.Quantity = Collection.Quantity;
    //                 oldPurchaseItem.Grade = Collection.Grade;
    //                 oldPurchaseItem.TareWeight = Collection.TareWeight;
    //                 oldPurchaseItem.TotalWeight = Collection.TotalWeight;
    //                 oldPurchaseItem.RatePerKg = Collection.RatePerKg;
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
    //                     var Billing = await context.Billings.FirstOrDefaultAsync(x => x.CollectionId == collectionId);
    //                     int billId = Billing.Id;
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
    // public async Task<bool> Delete(int collectionId)
    // {
    //     bool status = false;
    //     try
    //     {
    //         using (var context = new CollectionContext(_configuration))
    //         {
    //             Collection Collection = await context.Collections.FindAsync(collectionId);
    //             if (Collection != null)
    //             {
    //                 context.Collections.Remove(Collection);
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

    // public async Task<List<CollectionBillingRecord>> GetFarmerPurchaseDetails(int farmerId)
    // {

    //     try
    //     {
    //         using (var context = new CollectionContext(_configuration))
    //         {
    //             List<CollectionBillingRecord>? purchaseData = await (from collection in context.Collections
    //                                                            join bill in context.Billings
    //                                                            on collection.Id equals bill.PurchaseId
    //                                                            join farmer in context.Farmers
    //                                                            on collection.FarmerId equals farmer.Id
    //                                                            join crop in context.Crops
    //                                                            on collection.CropId equals crop.Id
    //                                                            where collection.FarmerId == farmerId orderby collection.Date descending
    //                                                            select new CollectionBillingRecord()
    //                                                            {
    //                                                                Collection = collection,
    //                                                                Billing = bill,
    //                                                                FarmerName = farmer.FirstName + " " + farmer.LastName,
    //                                                                Title = crop.Title
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
    //         using (var context = new CollectionContext(_configuration)) //Disposal Technique
    //         {
    //             var results = await (from billing in context.Billings
    //                                  join purchase in context.Collections
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
    //         using (var context = new CollectionContext(_configuration))
    //         {
    //             var varityData = await (from billing in context.Billings
    //                                     join purchase in context.Collections
    //                                     on billing.PurchaseId equals purchase.Id
    //                                     join crop in context.Crops
    //                                     on purchase.CropId equals crop.Id
    //                                     where purchase.FarmerId == farmerId
    //                                     group billing by new { billing.Date.Year, crop.Title } into billingGroup
    //                                     select new FarmerSellVariety()
    //                                     {
    //                                         crop = billingGroup.Key.Title,
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
    //         using (var context = new CollectionContext(_configuration)) //Disposal Technique
    //         {
    //             var amount = await (from billing in context.Billings
    //                                 join purchase in context.Collections
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
    //         using (var context = new CollectionContext(_configuration))
    //         {
    //             var farmerOrdersCount = await (from purchase in context.Collections
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
