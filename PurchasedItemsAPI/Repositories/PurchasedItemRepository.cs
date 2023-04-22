
using Microsoft.EntityFrameworkCore;
using PurchasedItemsAPI.Context;
using PurchasedItemsAPI.Models;
using PurchasedItemsAPI.Repositories.Interfaces;
namespace PurchasedItemsAPI.Repositories;
public class PurchasedItemRepository : IPurchasedItemRepository
{
    private readonly IConfiguration _configuration;
    public PurchasedItemRepository(IConfiguration configuration){
        _configuration=configuration;
    }
    public async Task<List<PurchasedItem>> GetAllPurchasedItems()
    {
        try
        {
            using (var context = new PurchasedItemContext(_configuration))
            {
               List<PurchasedItem> purchasedItems=await context.PurchasedItems.ToListAsync();
               if(purchasedItems==null){
                return null;
               }
               return purchasedItems;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<PurchasedItem> GetPurchasedItem(int purchaseId)
    {
        try{
            using(var context=new PurchasedItemContext(_configuration)){
                PurchasedItem? purchasedItem=await context.PurchasedItems.FindAsync(purchaseId);
                if(purchasedItem==null){
                    return null;
                }
                return purchasedItem;     
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    public async Task<bool> Insert(PurchasedItem purchasedItem)
    {  
        bool status=false;
        try{
            using(var context=new PurchasedItemContext(_configuration)){
            await context.PurchasedItems.AddAsync(purchasedItem);
            await context.SaveChangesAsync();
            status=true;
            }
        }
        catch(Exception e){
            throw e;
        }
        return status; 
    }

    public async Task<bool> Update(int purchaseId, PurchasedItem purchasedItem)
    { 
        bool status=false;
        try{
            using(var context=new PurchasedItemContext(_configuration)){
                PurchasedItem? oldPurchasedItem=await context.PurchasedItems.FindAsync(purchaseId);
                if(oldPurchasedItem!=null){
                    oldPurchasedItem.Variety=purchasedItem.Variety;
                    oldPurchasedItem.Bags=purchasedItem.Bags;
                    oldPurchasedItem.TotalWeight=purchasedItem.TotalWeight;
                    oldPurchasedItem.TareWeight=purchasedItem.TareWeight;
                    oldPurchasedItem.NetWeight=purchasedItem.NetWeight;
                    oldPurchasedItem.RatePerKg=purchasedItem.RatePerKg;
                    oldPurchasedItem.LabourCharges=purchasedItem.LabourCharges;
                    oldPurchasedItem.Date=purchasedItem.Date;
                    oldPurchasedItem.TotalAmount=purchasedItem.TotalAmount;
                    await context.SaveChangesAsync();
                    status=true;
                }
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }

     public async Task<bool> Delete(int purchaseId)
    {
        bool status=false;
        try{
             using(var context=new PurchasedItemContext(_configuration)){
                PurchasedItem purchasedItem=await context.PurchasedItems.FindAsync(purchaseId);
                if(purchasedItem!=null){
                   context.PurchasedItems.Remove(purchasedItem);
                   await context.SaveChangesAsync();
                   status=true;
                }
             }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }

}