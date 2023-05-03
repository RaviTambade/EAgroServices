using SellsAPI.Contexts;
using SellsAPI.Models;
using SellsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace SellsAPI.Repositories;
public class SellRepository : ISellRepository
{
    private readonly IConfiguration _configuration;
    public SellRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Sell>> GetAll()
    {
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                List<Sell> sells = await context.Sells.ToListAsync();
                if (sells == null)
                {
                    return null;
                }
                return sells;
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
    public async Task<bool> Insert(Sell sell,FreightRate freightRate)
    {
        bool status = false;
        int billId=0;
        Billing billing=new Billing();
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                await context.Sells.AddAsync(sell);
                await context.SaveChangesAsync();
                billing.SellId = sell.SellId;
                await context.Billings.AddAsync(billing);
                await context.SaveChangesAsync();
                billId=billing.BillId;
                freightRate.BillId=billId;
                await context.FreightRates.AddAsync(freightRate);
                await context.SaveChangesAsync();
                context.Database.ExecuteSqlRaw("CALL calculate_labour_charges_of_sells(@p0)", billId);
                context.Database.ExecuteSqlRaw("CALL calculate_freight_charges(@p0)", billId);
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<bool> Update(int sellId, Sell sell)
    {
        bool status = false;
        try
        {
            using (var context = new SellsContext(_configuration))
            {
                Sell? oldSell = await context.Sells.FindAsync(sellId);
                double netWeight = oldSell.NetWeight;
                double ratePerKg = oldSell.RatePerKg;
                double totalAmount = oldSell.TotalAmount;

                if (oldSell != null)
                {
                    oldSell.PurchaseId = sell.PurchaseId;
                    oldSell.MerchantId = sell.MerchantId;
                    oldSell.TruckId = sell.TruckId;
                    oldSell.NetWeight = sell.NetWeight;
                    oldSell.RatePerKg = sell.RatePerKg;
                    oldSell.TotalAmount = sell.TotalAmount;
                    oldSell.Date = sell.Date;
                    await context.SaveChangesAsync();
                    status = true;
                }
                if (
                         netWeight != oldSell.NetWeight ||
                         ratePerKg != oldSell.RatePerKg ||
                         totalAmount != oldSell.TotalAmount 
                       )
                {
                    Console.WriteLine(" procedure called");
                    var sellBilling = await context.Billings.FirstOrDefaultAsync(x => x.SellId == sellId);
                    int billId = sellBilling.BillId;
                    Console.WriteLine(billId);
                    context.Database.ExecuteSqlRaw("CALL calculate_labour_charges_of_sells(@p0)", billId);
                    context.Database.ExecuteSqlRaw("CALL calculate_freight_charges(@p0)", billId);
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

}