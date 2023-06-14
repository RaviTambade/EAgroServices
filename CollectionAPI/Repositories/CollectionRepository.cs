using Microsoft.EntityFrameworkCore;
using CollectionAPI.Contexts;
using CollectionAPI.Models;
using CollectionAPI.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Numerics;

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

    public async Task<Billing> GetCollectionBill(int collectionId){
        try{
            using(var context=new CollectionContext(_configuration)){
                 var billing = await (
                    from collection in context.Collections
                    join bill in context.Billings on collection.Id equals bill.CollectionId
                    where collection.Id == collectionId
                    select bill
                ).FirstOrDefaultAsync();
            return billing;
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    
    public async Task<SellViewModel> GetCollectionSell(int collectionId){
        try{
            using(var context=new CollectionContext(_configuration)){
              var collectionsell = await (
                    from sell in context.Sells
                    join collection in context.Collections on sell.CollectionId equals collection.Id
                    join farmer in context.Farmers on sell.MerchantId equals farmer.Id
                    join vehicle in context.Vehicles on sell.VehicleId equals vehicle.Id
                    where collection.Id == collectionId
                    select new SellViewModel()
                    {
                       Sell=sell,
                       MerchantName=farmer.FirstName + " " + farmer.LastName,
                       VehicleNumber=vehicle.VehicleNumber
                    }
                ).FirstOrDefaultAsync();
                return collectionsell;
            }
        }
        catch(Exception e){
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
        bool status = false;
        Billing Billing = new Billing();
        try
        {
            bool FarmerExists = await IsUserFarmer(collection.FarmerId);
            if (!FarmerExists)
            {
                System.Console.WriteLine("--> user is not farmer");
                return false;
            }
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
            status = false;
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
                var FarmerExists = await (
                    from farmer in context.Farmers
                    join userRole in context.UserRoles on farmer.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "farmer" && farmer.Id == farmerId
                    select farmer
                ).AnyAsync();

                return FarmerExists;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> Update(int collectionId, Collection collection)
    {
        bool status = false;
        try
        {
            bool FarmerExists = await IsUserFarmer(collection.FarmerId);
            if (!FarmerExists)
            {
                System.Console.WriteLine("--> user is not farmer");
                return false;
            }
            using (var context = new CollectionContext(_configuration))
            {
                Collection? oldCollection = await context.Collections.FindAsync(collectionId);

                if (oldCollection != null)
                {
                    var hasValueChanges = CheckForChanges(oldCollection, collection);

                    oldCollection.FarmerId = collection.FarmerId;
                    oldCollection.CropId = collection.CropId;
                    oldCollection.ContainerType = collection.ContainerType;
                    oldCollection.Quantity = collection.Quantity;
                    oldCollection.Grade = collection.Grade;
                    oldCollection.TareWeight = collection.TareWeight;
                    oldCollection.TotalWeight = collection.TotalWeight;
                    oldCollection.RatePerKg = collection.RatePerKg;
                    await context.SaveChangesAsync();
                    status = true;

                    if (hasValueChanges)
                    {
                        Console.WriteLine("--> procedure called");
                        var Billing = await context.Billings.FirstOrDefaultAsync(
                            x => x.CollectionId == collectionId
                        );
                        int billId = Billing.Id;
                        context.Database.ExecuteSqlRaw("CALL ApplyLabourCharges(@p0)", billId);
                        context.Database.ExecuteSqlRaw(
                            "CALL DeductLabourChargesFromRevenue(@p0)",
                            billId
                        );
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

    private bool CheckForChanges(Collection oldCollection, Collection newCollection)
    {
        return oldCollection.ContainerType != newCollection.ContainerType
            || oldCollection.Quantity != newCollection.Quantity
            || oldCollection.Grade != newCollection.Grade
            || oldCollection.TareWeight != newCollection.TareWeight
            || oldCollection.TotalWeight != newCollection.TotalWeight
            || oldCollection.RatePerKg != newCollection.RatePerKg;
    }

    public async Task<bool> Delete(int collectionId)
    {
        bool status = false;
        try
        {
            using (var context = new CollectionContext(_configuration))
            {
                Collection Collection = await context.Collections.FindAsync(collectionId);
                if (Collection != null)
                {
                    context.Collections.Remove(Collection);
                    var affectedRows = await context.SaveChangesAsync();
                    if (affectedRows >= 1)
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

    public async Task<List<CollectionViewModel>> GetCollections( StartDateFilter startDate){
        try{
            using(var context=new CollectionContext(_configuration)){
                  var collections = await (from farmer in context.Farmers
                                              join collection in context.Collections
                                              on farmer.Id equals collection.FarmerId
                                              join crop in context.Crops
                                              on collection.CropId equals crop.Id
                                              where  collection.Date.Year == startDate.Date.Year
                                              && collection.Date.Month == startDate.Date.Month
                                              && collection.Date.Day == startDate.Date.Day
                                              select new CollectionViewModel()
                                              {
                                                  Collection=collection,
                                                  FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                  CropName = crop.Title
                                              }).ToListAsync();
                return collections;
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    public async Task<CollectionViewModel> GetCollection(int collectionId){
         try{
            using(var context=new CollectionContext(_configuration)){
                  var data = await (from farmer in context.Farmers
                                              join collection in context.Collections
                                              on farmer.Id equals collection.FarmerId
                                              join crop in context.Crops
                                              on collection.CropId equals crop.Id
                                              where collection.Id ==collectionId
                                              select new CollectionViewModel()
                                              {
                                                  Collection=collection,
                                                  FarmerName = farmer.FirstName + " " + farmer.LastName,
                                                  CropName = crop.Title
                                              }).FirstOrDefaultAsync();
                return data;
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    // public async Task<List<Collection>> GetCollections(){
    //     try{
    //         using(var context=new CollectionContext(_configuration)){
    //           List<Collection> collections=await context.Collections.ToListAsync();
    //                 return collections; 
    //         }
    //     }
    //     catch(Exception e){
    //         throw e;
    //     } 
    // }
}