using Farmers.Models;
// using Farmers.Extensions;
using Farmers.Repositories.Interfaces;
using Farmers.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Farmers.Repositories;

public class FarmersCollectionRepository : IFarmersCollectionRepository
{
    private readonly IConfiguration _configuration;

    public FarmersCollectionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // public PagedList<CollectionDetails> GetAll(
    //     int collectionCenterId,
    //     FilterRequest request,
    //     int pageNumber
    // )
    // {
    //     try
    //     {
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             var query =
    //                 from collection in context.GoodsCollections
    //                 join crop in context.Crops on collection.CropId equals crop.Id
    //                 join verifiedCollection in context.VerifiedGoodsCollections
    //                     on collection.Id equals verifiedCollection.CollectionId
    //                 join shipmentItem in context.ShipmentItems
    //                     on collection.Id equals shipmentItem.CollectionId
    //                     into shipmentItemsCollection
    //                 from shipmentItem in shipmentItemsCollection.DefaultIfEmpty()
    //                 where shipmentItem == null

    //                 // select records which are verified but not added for shiping
    //                 select new CollectionDetails()
    //                 {
    //                     Id = collection.Id,
    //                     FarmerId = collection.FarmerId,
    //                     CropName = crop.Title,
    //                     ContainerType = collection.ContainerType,
    //                     Quantity = collection.Quantity,
    //                     Grade = verifiedCollection.Grade,
    //                     TotalWeight = collection.Weight,
    //                     NetWeight = verifiedCollection.Weight,
    //                     InspectorId = verifiedCollection.InspectorId,
    //                     CollectionDate = collection.CollectionDate
    //                 };
    //             query = query.ApplyFilters(request);
    //             return PagedList<CollectionDetails>.ToPagedList(query, pageNumber);
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<List<UnverifiedCollection>> GetUnverifiedCollections(int collectionCenterId)
    // {
    //     try
    //     {
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             var collections = await (
    //                 from collection in context.GoodsCollections
    //                 join crop in context.Crops on collection.CropId equals crop.Id
    //                 join verifiedGoodsCollection in context.VerifiedGoodsCollections
    //                     on collection.Id equals verifiedGoodsCollection.CollectionId
    //                     into gj
    //                 from verifiedCollection in gj.DefaultIfEmpty()
    //                 where
    //                     verifiedCollection == null
    //                     && collection.CollectionCenterId == collectionCenterId
    //                 select new UnverifiedCollection()
    //                 {
    //                     CollectionId = collection.Id,
    //                     FarmerId = collection.FarmerId,
    //                     CropName = crop.Title,
    //                     CropId = crop.Id,
    //                     ContainerType = collection.ContainerType,
    //                     Quantity = collection.Quantity,
    //                     Weight = collection.Weight,
    //                     CollectionDate = collection.CollectionDate
    //                 }
    //             ).ToListAsync();
    //             if (collections == null)
    //             {
    //                 return null;
    //             }
    //             return collections;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<GoodsCollection> GetById(int collectionId)
    // {
    //     try
    //     {
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             var collection = await context.GoodsCollections.FindAsync(collectionId);

    //             if (collection == null)
    //             {
    //                 return null;
    //             }

    //             return collection;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<bool> Insert(GoodsCollection collection)
    // {
    //     try
    //     {
    //         bool status = false;
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             await context.GoodsCollections.AddAsync(collection);
    //             status = await SaveChanges(context);
    //             return status;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<bool> Update(GoodsCollection collection)
    // {
    //     try
    //     {
    //         bool status = false;
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             var oldcollection = await context.GoodsCollections.FindAsync(collection.Id);
    //             if (oldcollection is not null)
    //             {
    //                 oldcollection.FarmerId = collection.FarmerId;
    //                 oldcollection.CropId = collection.CropId;
    //                 oldcollection.ContainerType = collection.ContainerType;
    //                 oldcollection.Quantity = collection.Quantity;
    //                 oldcollection.Weight = collection.Weight;
    //                 oldcollection.CollectionDate = collection.CollectionDate;
    //                 status = await SaveChanges(context);
    //             }
    //             return status;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // public async Task<bool> Delete(int collectionId)
    // {
    //     try
    //     {
    //         bool status = false;
    //         using (var context = new GoodsCollectionContext(_configuration))
    //         {
    //             var collection = await context.GoodsCollections.FindAsync(collectionId);
    //             if (collection is not null)
    //             {
    //                 context.GoodsCollections.Remove(collection);
    //                 status = await SaveChanges(context);
    //             }
    //             return status;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    // }

    // private async Task<bool> SaveChanges(GoodsCollectionContext context)
    // {
    //     int rowsAffected = await context.SaveChangesAsync();
    //     if (rowsAffected > 0)
    //     {
    //         return true;
    //     }
    //     return false;
    // }

    // public async Task<List<string>> GetContainerTypes()
    // {
    //     using (var dbContext = new GoodsCollectionContext(_configuration))
    //     {
    //         List<string> containerTypes = await dbContext.GoodsCollections
    //             .Select(collection => collection.ContainerType)
    //             .Distinct()
    //             .ToListAsync();

    //         return containerTypes;
    //     }
    // }

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
       public async Task<MonthlyRevenue> MonthlyRevenue(int collectionId)
        {
            try
            {
                using (var context = new FarmerContext(_configuration))
                {
                    var monthlyRevenue = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        // join charges in context.Costing
                        //     on shipmentItem.Id equals charges.ShipmentItemId
                        // join shipment in context.Shipments
                        //     on shipmentItem.ShipmentId equals shipment.Id
                        // join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        // join transporter in context.Transporters
                        //     on vehicle.TransporterId equals transporter.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedGoodsCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        // join crop in context.Crops on collection.CropId equals crop.Id
                        where shipmentItem.CollectionId == collectionId
                        select new MonthlyRevenue()
                        {
                            // Id = invoice.Id,
                            // FarmerId = collection.FarmerId,
                            // CollectionId = collection.Id,
                            // CollectionCenterCorporateId = collectionCenter.CorporateId,
                            // TransporterCorporatId = transporter.CorporateId,
                            // VehicleNumber = vehicle.RtoNumber,
                            // CropName = crop.Title,
                            // Grade = verifiedCollection.Grade,
                            // ContainerType = collection.ContainerType,
                            // Quantity = collection.Quantity,
                            // TotalWeight = collection.Weight,
                            // NetWeight = verifiedCollection.Weight,
                            // FreightCharges = charges.FreightCharges,
                            // LabourCharges = charges.LabourCharges,
                            // PaymentStatus = invoice.PaymentStatus,
                            // ServiceCharges = charges.ServiceCharges,
                            // RatePerKg = invoice.RatePerKg,
                            TotalAmount = invoice.TotalAmount,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).FirstOrDefaultAsync();

                    if (invoiceDetails is null)
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
}
