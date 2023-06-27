using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using MerchantsAPI.Context;
using MerchantsAPI.Models;
using MerchantsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MerchantsAPI.Repositories;

public class MerchantRepository : IMerchantRepository
{
    private readonly IConfiguration _configuration;

    public MerchantRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Merchant>> GetMerchants()
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                var merchants = await (
                    from merchant in context.Merchants
                    join userrole in context.UserRoles on merchant.Id equals userrole.UserId
                    join role in context.Roles on userrole.RoleId equals role.Id
                    where role.RoleName == "merchant"
                    select merchant
                ).ToListAsync();
                if (merchants == null)
                {
                    return null;
                }
                return merchants;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<List<string>> GetMerchantsNames()
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                var merchants = await (
                    from merchant in context.Merchants
                    join userrole in context.UserRoles on merchant.Id equals userrole.UserId
                    join role in context.Roles on userrole.RoleId equals role.Id
                    where role.RoleName == "merchant"
                    select (merchant.FirstName+" "+merchant.LastName) 
                ).ToListAsync();
                // if (merchants == null)
                // {
                //     return null;
                // }
                return merchants;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Merchant> GetMerchant(int merchantId)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                Merchant merchant = await (
                    from m in context.Merchants
                    join userRole in context.UserRoles on m.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.RoleName == "merchant" && m.Id == merchantId
                    select m
                ).FirstOrDefaultAsync();
                ;
                if (merchant == null)
                {
                    return null;
                }
                return merchant;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                List<MerchantRecord> merchantRecords = await (
                    from merchant in context.Merchants
                    join collectionsell in context.CollectionSells
                        on merchant.Id equals collectionsell.MerchantId
                    join collection in context.Collections
                        on collectionsell.CollectionId equals collection.Id
                        join labourrate in context.LabourRates on collection.ContainerType equals labourrate.ContainerType
                    join crop in context.Crops on collection.CropId equals crop.Id
                    join vehicle in context.Vehicles on collectionsell.VehicleId equals vehicle.Id
                 
                    where collectionsell.MerchantId == merchantId
                    orderby collectionsell.Date descending
                    select new MerchantRecord()
                    {
                        CropImage = crop.ImageUrl,
                        ContainerImage = labourrate.ImageUrl,
                        Quantity = collectionsell.Quantity,
                        Grade = collection.Grade,
                        NetWeight = collectionsell.NetWeight,
                        RatePerKg = collectionsell.RatePerKg,
                        VehicleNumber = vehicle.VehicleNumber,
                        Date = collectionsell.Date
                    }
                ).ToListAsync();
                return merchantRecords;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<MerchantRecord>> GetMerchantSellRecordsByDate(
        int merchantId,
        DateFilter dateFilter
    )
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                List<MerchantRecord> merchantRecords = await (
                    from merchant in context.Merchants
                    join collectionsell in context.CollectionSells
                        on merchant.Id equals collectionsell.MerchantId
                    join collection in context.Collections
                        on collectionsell.CollectionId equals collection.Id
                        join labourrate in context.LabourRates on collection.ContainerType equals labourrate.ContainerType
                    join crop in context.Crops on collection.CropId equals crop.Id
                    join vehicle in context.Vehicles on collectionsell.VehicleId equals vehicle.Id
                    where
                        collectionsell.MerchantId == merchantId
                        && (
                            dateFilter.StartDate == default
                            || collectionsell.Date >= dateFilter.StartDate
                        )
                        && (
                            dateFilter.EndDate == default
                            || collectionsell.Date <= dateFilter.EndDate
                        )
                    orderby collectionsell.Date ascending
                    select new MerchantRecord()
                    {
                        CropImage = crop.ImageUrl,
                        ContainerImage = labourrate.ImageUrl,
                        Quantity = collectionsell.Quantity,
                        Grade = collection.Grade,
                        NetWeight = collectionsell.NetWeight,
                        RatePerKg = collectionsell.RatePerKg,
                        VehicleNumber = vehicle.VehicleNumber,
                        Date = collectionsell.Date
                    }
                ).ToListAsync();
                return merchantRecords;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<Merchant>> SearchByName(string name){
        try{
            using(var context =new MerchantContext(_configuration)){
            List<Merchant> merchants=await (from merchant in context.Merchants
                                            join userrole in context.UserRoles 
                                            on merchant.Id equals userrole.UserId
                                            join role in context.Roles
                                            on userrole.RoleId equals role.Id
                                            where role.RoleName=="merchant" &&
                                            merchant.FirstName.Contains(name) select merchant).ToListAsync();
            return merchants;
            }
        }
        catch(Exception e){ 
            throw e;
        }
    }

       public async Task<List<MerchantRecord>> GetTodaysMerchantSellRecords(int merchantId,StartDateFilter startDate)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                List<MerchantRecord> merchantRecords = await (
                    from merchant in context.Merchants
                    join collectionsell in context.CollectionSells
                        on merchant.Id equals collectionsell.MerchantId
                    join collection in context.Collections
                        on collectionsell.CollectionId equals collection.Id
                        join labourrate in context.LabourRates on collection.ContainerType equals labourrate.ContainerType
                    join crop in context.Crops on collection.CropId equals crop.Id
                    join vehicle in context.Vehicles on collectionsell.VehicleId equals vehicle.Id
                    where collectionsell.MerchantId == merchantId &&
                     collectionsell.Date.Year == startDate.Date.Year
                        && collectionsell.Date.Month == startDate.Date.Month
                        && collectionsell.Date.Day == startDate.Date.Day
                    select new MerchantRecord()
                    {
                        CropImage = crop.ImageUrl,
                        ContainerImage = labourrate.ImageUrl,
                        Quantity = collectionsell.Quantity,
                        Grade = collection.Grade,
                        NetWeight = collectionsell.NetWeight,
                        RatePerKg = collectionsell.RatePerKg,
                        VehicleNumber = vehicle.VehicleNumber,
                        Date = collectionsell.Date
                    }
                ).ToListAsync();
                return merchantRecords;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}

