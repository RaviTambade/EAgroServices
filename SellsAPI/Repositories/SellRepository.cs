using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Globalization;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SellsAPI.Contexts;
using SellsAPI.Models;
using SellsAPI.Repositories.Interfaces;

namespace SellsAPI.Repositories;
public class SellRepository : ISellRepository
{
    private readonly IConfiguration _configuration;
    public SellRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<SellBillingView>> GetAll()
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                List<SellBillingView> sellBillingViews = await (from merchant in context.Merchants
                                                                join sell in context.Sells
                                                                on merchant.MerchantId equals sell.MerchantId
                                                                join truck in context.Trucks
                                                                on sell.TruckId equals truck.TruckId
                                                                join bill in context.Billings
                                                                on sell.SellId equals bill.SellId
                                                                join freightRate in context.FreightRates
                                                                on bill.BillId equals freightRate.BillId
                                                                select new SellBillingView()
                                                                {
                                                                    Sell = sell,
                                                                    Billing = bill,
                                                                    FreightRate = freightRate,
                                                                    FullName = merchant.FirstName + " " + merchant.LastName,
                                                                    TruckNumber = truck.TruckNumber
                                                                }).ToListAsync();

                if (sellBillingViews == null)
                {
                    return null;
                }
                return sellBillingViews;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Sell> GetById(int sellId)
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                Sell sell = await context.Sells.FindAsync(sellId);
                if (sell == null)
                {
                    return null;
                }
                return sell;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(Sell sell, FreightRate freightRate)
    {
        bool status = false;
        int billId = 0;
        Billing billing = new Billing();
        try
        {
            using (var context = new SellsContext(_configuration))
            {

                var remainingQuantity = await (from p in context.PurchaseItems
                                               where p.PurchaseId == sell.PurchaseId
                                               select p.Quantity - context.Sells.Where(s => s.PurchaseId == sell.PurchaseId).Sum(s => s.Quantity))
                               .FirstOrDefaultAsync();
                Console.WriteLine(remainingQuantity);
                if (sell.Quantity <= remainingQuantity && remainingQuantity==0)
                {
                    Console.WriteLine("inside function");
                    Console.WriteLine("After insertion remaining is "+(remainingQuantity-sell.Quantity));

                    await context.Sells.AddAsync(sell);
                    await context.SaveChangesAsync();
                    billing.SellId = sell.SellId;
                    await context.Billings.AddAsync(billing);
                    await context.SaveChangesAsync();
                    billId = billing.BillId;
                    freightRate.BillId = billId;
                    await context.FreightRates.AddAsync(freightRate);
                    await context.SaveChangesAsync();
                    context.Database.ExecuteSqlRaw("CALL calculate_labour_charges_of_sells(@p0)", billId);
                    context.Database.ExecuteSqlRaw("CALL calculate_freight_charges(@p0)", billId);
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

    public async Task<bool> Update(int sellId, Sell sell, FreightRate freightRate)
    {
        bool status = false;
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                SellBilling? oldSellBilling = await (from s in context.Sells
                                                     join bill in context.Billings
                                                     on s.SellId equals bill.SellId
                                                     join fRate in context.FreightRates
                                                     on bill.BillId equals fRate.BillId
                                                     where s.SellId == sellId
                                                     select new SellBilling()
                                                     {
                                                         Sell = s,
                                                         Billing = bill,
                                                         FreightRate = fRate
                                                     }).FirstOrDefaultAsync();



                // var sell= oldSellBilling.Sell;
                // var billing= oldSellBilling.Billing;
                // var freightRate = oldSellBilling.FreightRate;
                if (oldSellBilling != null)
                {
                    Sell? oldSell = oldSellBilling.Sell;
                    Billing? oldBilling = oldSellBilling.Billing;
                    FreightRate? oldFreightRate = oldSellBilling.FreightRate;


                    if (oldSell != null)
                    {
                        oldSell.PurchaseId = sell.PurchaseId;
                        oldSell.MerchantId = sell.MerchantId;
                        oldSell.NetWeight = sell.NetWeight;
                        oldSell.RatePerKg = sell.RatePerKg;
                        oldSell.TruckId = sell.TruckId;
                    }

                    if (oldFreightRate != null)
                    {
                        oldFreightRate.FromDestination = freightRate.FromDestination;
                        oldFreightRate.ToDestination = freightRate.ToDestination;
                        oldFreightRate.Kilometers = freightRate.Kilometers;
                        oldFreightRate.RatePerKm = freightRate.RatePerKm;
                    }

                    await context.SaveChangesAsync();
                    Console.WriteLine(" procedure called");
                    // var sellBilling = await context.Billings.FirstOrDefaultAsync(x => x.SellId == sellId);
                    int billId = oldBilling.BillId;

                    Console.WriteLine(billId);
                    context.Database.ExecuteSqlRaw("CALL calculate_labour_charges_of_sells(@p0)", billId);
                    context.Database.ExecuteSqlRaw("CALL calculate_freight_charges(@p0)", billId);
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
    public async Task<bool> Delete(int sellId)
    {
        bool status = false;
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                Sell? sell = await context.Sells.FindAsync(sellId);
                if (sell != null)
                {
                    context.Sells.Remove(sell);
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

    public async Task<SellBilling> GetSellBilling(int sellId)
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                SellBilling? sellsData = await (from sell in context.Sells
                                                join bill in context.Billings
                                                on sell.SellId equals bill.SellId
                                                where sell.SellId == sellId
                                                join freightRate in context.FreightRates
                                                on bill.BillId equals freightRate.BillId
                                                select new SellBilling()
                                                {
                                                    Sell = sell,
                                                    Billing = bill,
                                                    FreightRate = freightRate
                                                }).FirstOrDefaultAsync();
                return sellsData;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<MerchantSell>> GetSellByMerchantId(int merchantId)
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                var sellsData = await (from merchant in context.Merchants
                                   join sell in context.Sells
                                   on merchant.MerchantId equals sell.MerchantId
                                   join purchaseItem in context.PurchaseItems
                                   on sell.PurchaseId equals purchaseItem.PurchaseId
                                   join variety in context.Varieties
                                   on purchaseItem.VarietyId equals variety.VarietyId 
                                   join truck in context.Trucks
                                   on sell.TruckId equals truck.TruckId
                                   where sell.MerchantId == merchantId orderby sell.Date descending
                                   select new MerchantSell()
                                   {
                                       VarietyName=variety.VarietyName,
                                       ContainerType=purchaseItem.ContainerType,
                                       Quantity=sell.Quantity,
                                       Grade=purchaseItem.Grade,
                                       NetWeight=sell.NetWeight,
                                       RatePerKg=sell.RatePerKg,
                                       TotalAmount=sell.TotalAmount,
                                       TruckNumber=truck.TruckNumber,
                                       FullName = merchant.FirstName + " " + merchant.LastName,
                                       Date=sell.Date
                                   }).ToListAsync();
                return sellsData;
            }

        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<TruckBilling>> GetTruckBillingsByTruckId(int truckId)
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                List<TruckBilling> truckBillings = await (from truck in context.Trucks
                                                          join sell in context.Sells
                                                          on truck.TruckId equals sell.TruckId
                                                          join bill in context.Billings
                                                          on sell.SellId equals bill.SellId
                                                          join freightRate in context.FreightRates
                                                          on bill.BillId equals freightRate.BillId
                                                          where sell.TruckId == truckId
                                                          select new TruckBilling()
                                                          {
                                                              Billing = bill,
                                                              FreightRate = freightRate,
                                                              TruckNumber = truck.TruckNumber
                                                          }).ToListAsync();
                return truckBillings;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<MerchantRevenue>> GetMerchantRevenues(int merchantId){
        try{
            using(var context=new SellsContext(_configuration)){
                                   var merchantRevenues=await(from m in context.Merchants
                                                        join s in context.Sells 
                                                        on m.MerchantId equals s.MerchantId
                                                        where s.MerchantId == merchantId
                                                        group s by s.Date.Month into sellsgroup
                                                        select new MerchantRevenue()
                                                        {
                                                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(sellsgroup.Key),
                                                        TotalAmount = sellsgroup.Sum(s => s.TotalAmount),
                                                        }).ToListAsync();
                                                        return merchantRevenues;
            }
        }
          catch (Exception e)   
        {
            throw e;
        }
    }

    public async Task<double> GetTotalPurchaseAmountByMerchant(int merchantId){
        try{
            using(var context=new SellsContext(_configuration)){
                var amount=context.Sells.Where(sell=>sell.MerchantId==merchantId).Sum(sell=>sell.TotalAmount);
                return amount ;
            }
        } catch (Exception e)   
        {
            throw e;
        }
    }
}