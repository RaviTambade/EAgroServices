using System.Globalization;
using Microsoft.EntityFrameworkCore;
using PurchasingAPI.Contexts;
using PurchasingAPI.Models;
using PurchasingAPI.Repositories.Interfaces;
namespace PurchasingAPI.Repositories;

public class PurchaseRepository : IPurchaseRepository
{
    private readonly IConfiguration _configuration;
    public PurchaseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

  
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

     public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId,int varietyId)
    {
        try
        {
            using (var context = new PurchaseContext(_configuration))
            {
                var varityData = await (from billing in context.PurchaseBillings
                                        join purchase in context.PurchaseItems
                                        on billing.PurchaseId equals purchase.Id
                                        join variety in context.Varieties
                                        on purchase.VarietyId equals variety.Id
                                        where purchase.FarmerId == farmerId 
                                        && purchase.VarietyId==varietyId
                                        group billing by new { billing.Date.Year, variety.VarietyName } into billingGroup
                                        select new FarmerSellVariety()
                                        {
                                            Variety = billingGroup.Key.VarietyName,
                                            Year = billingGroup.Key.Year,
                                            TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
                                        }).ToListAsync();
                return varityData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

}

