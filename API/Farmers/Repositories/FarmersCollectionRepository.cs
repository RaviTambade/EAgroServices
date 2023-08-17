using Farmers.Models;
using Farmers.Repositories.Interfaces;
using Farmers.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Farmers.Repositories;

public class FarmersCollectionRepository : IFarmersCollectionRepository
{
    private readonly IConfiguration _configuration;

    public FarmersCollectionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }


    public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
    {
        try
        {
            using (var context = new FarmerContext(_configuration))
            {
                List<FarmerCollection> farmercollections = await (
                    from collection in context.GoodsCollections
                    join center in context.CollectionCenters
                        on collection.CollectionCenterId equals center.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    where collection.FarmerId == farmerId
                    select new FarmerCollection()
                    {
                        Id = collection.Id,
                        CropName = crop.Title,
                        ImageUrl = crop.ImageUrl,
                        CollectionCenterId = collection.CollectionCenterId,
                        CorporateId = center.CorporateId,
                        InspectorId = center.CorporateId,
                        Quantity = (int)collection.Quantity,
                        ContainerType = collection.ContainerType,
                        Weight = collection.Weight,
                        CollectionDate = collection.CollectionDate
                    }
                ).ToListAsync();
                return farmercollections;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId)
    {
        try
        {
            Console.WriteLine(farmerId);
            using (var context = new FarmerContext(_configuration))
            {
                var verifiedcollection = await (
                    from collection in context.GoodsCollections
                    join center in context.CollectionCenters
                        on collection.CollectionCenterId equals center.Id
                    join crop in context.Crops on collection.CropId equals crop.Id
                    join verifiedGoodsCollection in context.VerifiedGoodsCollections
                        on collection.Id equals verifiedGoodsCollection.CollectionId
                    where collection.FarmerId == farmerId
                    select new FarmerCollection()
                    {
                        Id = collection.Id,
                        CropName = crop.Title,
                        ImageUrl = crop.ImageUrl,
                        CollectionCenterId = collection.CollectionCenterId,
                        CorporateId = center.CorporateId,
                        InspectorId = center.CorporateId,
                        Quantity = (int)collection.Quantity,
                        ContainerType = collection.ContainerType,
                        Weight = collection.Weight,
                        CollectionDate = collection.CollectionDate,
                        Grade = verifiedGoodsCollection.Grade,
                        VerifiedWeight = verifiedGoodsCollection.Weight,
                        InspectionDate = verifiedGoodsCollection.InspectionDate
                    }
                ).ToListAsync();
                if (verifiedcollection == null)
                {
                    return null;
                }
                return verifiedcollection;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
    {
        try
        {
            using (var context = new FarmerContext(_configuration))
            {
                var collections = await (
                    from collection in context.GoodsCollections
                    join center in context.CollectionCenters
                        on collection.CollectionCenterId equals center.Id
                    join crop in context.Crops on collection.CropId equals crop.Id

                    join verifiedGoodsCollection in context.VerifiedGoodsCollections
                        on collection.Id equals verifiedGoodsCollection.CollectionId
                        into gj
                    from verifiedCollection in gj.DefaultIfEmpty()
                    where verifiedCollection == null && collection.FarmerId == farmerId
                    select new FarmerCollection()
                    {
                        Id = collection.Id,
                        CropName = crop.Title,
                        ImageUrl = crop.ImageUrl,
                        CollectionCenterId = collection.CollectionCenterId,
                        CorporateId = center.CorporateId,
                        InspectorId = center.CorporateId,
                        Quantity = (int)collection.Quantity,
                        ContainerType = collection.ContainerType,
                        Weight = collection.Weight,
                        CollectionDate = collection.CollectionDate
                    }
                ).ToListAsync();
                if (collections == null)
                {
                    return null;
                }
                return collections;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    
       public async Task<List<Revenue>> MonthlyRevenue(int farmerId)
        {
            try
            {
                using (var context = new FarmerContext(_configuration))
                {
                    var monthlyRevenue = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedGoodsCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        where collection.FarmerId == farmerId
                         group new {invoice,shipmentItem} by invoice.InvoiceDate.Month into g
                        orderby g.Key
                        select new Revenue()
                        {
                             InvoiceDate = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                          TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                           
                        }
                    ).ToListAsync();

                    if (monthlyRevenue is null)
                    {
                        return null;
                    }

                    return monthlyRevenue;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


  public async Task<List<Revenue>> YearRevenue(int farmerId)
        {
            try
            {
                using (var context = new FarmerContext(_configuration))
                {
                    var yearRevenue = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedGoodsCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        where collection.FarmerId == farmerId
                         group new {invoice,shipmentItem} by invoice.InvoiceDate.Year into g
                        orderby g.Key
                        select new Revenue()
                        {
                             Year = g.Key,
                          TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                           
                        }
                    ).ToListAsync();

                    if (yearRevenue is null)
                    {
                        return null;
                    }

                    return yearRevenue;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

         public async Task<List<CropRevenue>> CropRevenue(int farmerId)
        {
            try
            {
                using (var context = new FarmerContext(_configuration))
                {
                    var cropRevenue = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedGoodsCollections
                            on collection.Id equals verifiedCollection.CollectionId
                         join crop in context.Crops on collection.CropId equals crop.Id
                        where collection.FarmerId == farmerId && invoice.PaymentStatus == "paid"
                         group new {invoice,shipmentItem,crop}  by new { crop.Title, Year = invoice.InvoiceDate.Year } into g
    orderby g.Key.Title, g.Key.Year
                        select new CropRevenue()
                        {
                            Year = g.Key.Year,
                            CropName = g.Key.Title,
                          TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                          
                          
                        }
                    ).ToListAsync();

                    if (cropRevenue is null)
                    {
                        return null;
                    }

                    return cropRevenue;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
}
