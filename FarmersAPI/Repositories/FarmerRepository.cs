using System;
using System.Globalization;
using System.Linq.Expressions;
using FarmersAPI.Contexts;
using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FarmersAPI.Repositories;

public class FarmerRepository : IFarmerRepository
{
    private readonly IConfiguration _configuration;

    public FarmerRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Farmer>> GetFarmers()
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                var farmers = await (
                    from farmer in context.Farmers
                    join userRole in context.UserRoles on farmer.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "farmer"
                    select farmer
                ).ToListAsync();
                if (farmers == null)
                {
                    return null;
                }
                return farmers;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Farmer> GetFarmer(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer? farmer = await (
                    from f in context.Farmers
                    join userRole in context.UserRoles on f.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "farmer" && f.Id == farmerId
                    select f
                ).FirstOrDefaultAsync();
                if (farmer == null)
                {
                    return null;
                }
                return farmer;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollection>> GetFarmerCollections(int farmerId)
    {
        // int pagesize=10;
        // int page=1;
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                List<FarmerCollection>? collections = await (
                    from collection in context.Collections
                    join farmer in context.Farmers on collection.FarmerId equals farmer.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where collection.FarmerId == farmerId
                    orderby collection.Date descending
                    select new FarmerCollection() { Collection = collection, CropName = crop.Title }
                ).ToListAsync();
                // collections=collections.Skip((page-1)*pagesize).Take(pagesize).ToList();
                Console.WriteLine(collections.Count);
                return collections;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollection>> GetFarmerCollectionsBetweenDates(
        int farmerId,
        DateFilter dateFilter
    )
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                List<FarmerCollection>? collections = await (
                    from collection in context.Collections
                    join farmer in context.Farmers on collection.FarmerId equals farmer.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where
                        collection.FarmerId == farmerId
                        && (
                            dateFilter.StartDate == default
                            || collection.Date >= dateFilter.StartDate
                        )
                        && (dateFilter.EndDate == default || collection.Date <= dateFilter.EndDate)
                    orderby collection.Date ascending
                    select new FarmerCollection() { Collection = collection, CropName = crop.Title }
                ).ToListAsync();
                return collections;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollection>> GetFarmerCollectionByCrop(int farmerId, int cropId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                List<FarmerCollection>? collections = await (
                    from collection in context.Collections
                    join farmer in context.Farmers on collection.FarmerId equals farmer.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where collection.FarmerId == farmerId && crop.Id == cropId
                    orderby collection.Date ascending
                    select new FarmerCollection() { Collection = collection, CropName = crop.Title }
                ).ToListAsync();
                return collections;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollectionPerMonth>> GetFarmerCollectionAmountByMonth(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                var farmerCollectionPerMonths = await (
                    from billing in context.Billings
                    join collection in context.Collections
                        on billing.CollectionId equals collection.Id
                    where collection.FarmerId == farmerId
                    group billing by new { billing.Date.Year, billing.Date.Month } into billingGroup
                    select new FarmerCollectionPerMonth()
                    {
                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(
                            billingGroup.Key.Month
                        ),
                        Year = billingGroup.Key.Year,
                        TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
                    }
                ).ToListAsync();
                return farmerCollectionPerMonths;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollectionByCrop>> GetFarmerCollectionAmountByCrop(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                var collectionByCrops = await (
                    from billing in context.Billings
                    join collection in context.Collections
                        on billing.CollectionId equals collection.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where collection.FarmerId == farmerId
                    group billing by new { billing.Date.Year, crop.Title } into billingGroup
                    select new FarmerCollectionByCrop()
                    {
                        Crop = billingGroup.Key.Title,
                        Year = billingGroup.Key.Year,
                        TotalAmount = billingGroup.Sum(billing => billing.TotalAmount),
                    }
                ).ToListAsync();
                return collectionByCrops;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<int> GetFarmerId(string farmerName)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                int farmerId = await context.Farmers
                    .Where(f => (f.FirstName + " " + f.LastName) == farmerName)
                    .Select(f => f.Id)
                    .FirstOrDefaultAsync();
                return farmerId;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<Farmer>> GetFilteredFarmers(Address address)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                var farmers = await (
                    from farmer in context.Farmers
                    join userRole in context.UserRoles on farmer.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.Name == "farmer"
                        &&  context.Addresses.Any(
                            a =>
                                a.UserId == farmer.Id
                                && a.State == address.State
                                && a.District == address.District
                                && a.Tahsil == address.Tahsil
                                && a.Village == address.Village
                        )
                    select new Farmer
                    {
                        Id = farmer.Id,
                        FirstName = farmer.FirstName,
                        LastName = farmer.LastName,
                        ImageUrl=farmer.ImageUrl
                    }
                ).ToListAsync();
                return farmers;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
