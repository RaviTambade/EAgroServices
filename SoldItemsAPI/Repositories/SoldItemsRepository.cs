using SoldItemsAPI.Context;
using SoldItemsAPI.Models;
using SoldItemsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
 
namespace SoldItemsAPI.Repositories
{
    public class SoldItemsRepository : ISoldItemsRepository
{
      private readonly IConfiguration _configuration;
    public SoldItemsRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

public async Task<IEnumerable<SoldItems>>GetSoldItemsDetails()
{
      try
        {
            using (var context = new SoldItemsContext(_configuration))
            {
                List<SoldItems> soldItems = await context.SoldItems.ToListAsync();
                if (soldItems == null)
                {
                    return null;
                }
                return soldItems;
            }
        }
         catch (Exception e)
        {
            throw e;
        }
    }
     public async Task<SoldItems> GetById(int sellId)
    {
        try
        {
            using (var context = new SoldItemsContext(_configuration))
            {
                SoldItems soldItems = await context.SoldItems.FindAsync(sellId);
                if (soldItems == null)
                {
                    return null;
                }
                return soldItems;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(SoldItems soldItems)
    {
        bool status = false;
        try
        {
            using (var context = new SoldItemsContext(_configuration))
            {
                await context.SoldItems.AddAsync(soldItems);
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
     public async Task<bool> Update(int sellId,SoldItems soldItems)
    {
        bool status = false;
        try
        {
            Console.WriteLine(sellId);
            Console.WriteLine(soldItems.RatePerKg);
            Console.WriteLine(soldItems.NetWeight);
            Console.WriteLine(soldItems.Date);
            Console.WriteLine(soldItems.TransportId);
            using (var context = new SoldItemsContext(_configuration))
            {
                SoldItems? oldSoldItems = await context.SoldItems.FindAsync(sellId);
                if (oldSoldItems != null)
                {
                    Console.WriteLine(soldItems.TotalAmount);
                    oldSoldItems.PurchaseId = soldItems.PurchaseId;
                    oldSoldItems.ConsigneeId = soldItems.ConsigneeId;
                    oldSoldItems.TransportId = soldItems.TransportId;
                    oldSoldItems.NetWeight = soldItems.NetWeight;
                    oldSoldItems.RatePerKg = soldItems.RatePerKg;
                    oldSoldItems.TotalAmount = soldItems.TotalAmount;
                    oldSoldItems.Date = soldItems.Date;
                    Console.WriteLine(oldSoldItems.TotalAmount);

                    await context.SaveChangesAsync(); 
                    status= true;
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
            using (var context = new SoldItemsContext(_configuration))
            {
                SoldItems? soldItems = await context.SoldItems.FindAsync(sellId);
                if (sellId != null)
                {
                    context.SoldItems.Remove(soldItems);
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
}

