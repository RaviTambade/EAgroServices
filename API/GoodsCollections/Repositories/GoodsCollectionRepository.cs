using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Entities;
using Transflower.EAgroServices.GoodsCollections.Extensions;
using Transflower.EAgroServices.GoodsCollections.Repositories.Interfaces;
using Transflower.EAgroServices.GoodsCollections.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Transflower.EAgroServices.GoodsCollections.Repositories;

public class GoodsCollectionRepository : IGoodsCollectionRepository
{
    private readonly GoodsCollectionContext _context;

    public GoodsCollectionRepository(GoodsCollectionContext context)
    {
        _context = context;
    }

    public async Task<PagedList<Collection>> GetCollections(
        int collectionCenterId,
        FilterRequest request,
        int pageNumber,
        string type
    )
    {
        try
        {
            IQueryable<Collection> baseQuery =
                from collection in _context.GoodsCollections
                join crop in _context.Crops on collection.CropId equals crop.Id
                where collection.CollectionCenterId == collectionCenterId
                select new Collection()
                {
                    CollectionId = collection.Id,
                    FarmerId = collection.FarmerId,
                    CropId = collection.CropId,
                    CropName = crop.Title,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    Weight = collection.Weight,
                    CollectionDate = collection.CollectionDate
                };

            IQueryable<Collection> query;

            if (type is CollectionListType.All)
            {
                query = baseQuery;
            }
            else if (type is CollectionListType.UnVerified)
            {
                query =
                    from item in baseQuery
                    join verifiedGoodsCollection in _context.VerifiedGoodsCollections
                        on item.CollectionId equals verifiedGoodsCollection.CollectionId
                        into gj
                    from verifiedCollection in gj.DefaultIfEmpty()
                    where verifiedCollection == null
                    select item;
            }
            else
            {
                throw new ArgumentException("Invalid type parameter.");
            }

            query = query.ApplyFilters(request);
            var collections = await PagedList<Collection>.ToPagedList(query, pageNumber);
            return collections;
        }
        catch (Exception)
        {
            throw;
        }
    }

 public async Task<List<CollectionList>> GetCollectionList(
        int collectionCenterId,
        // FilterRequest request,
        // int pageNumber,
         string type
    )
    {
        try
        {
              IQueryable<CollectionList> baseQuery = 
                from collection in _context.GoodsCollections
                join crop in _context.Crops on collection.CropId equals crop.Id
                where collection.CollectionCenterId == collectionCenterId
                select new CollectionList()
                {
                    CollectionId = collection.Id,
                    FarmerId = collection.FarmerId,
                    // CropId = collection.CropId,
                    CropName = crop.Title,
                    // ContainerType = collection.ContainerType,
                    // Quantity = collection.Quantity,
                    // Weight = collection.Weight,
                    CollectionDate = collection.CollectionDate
                }; 
                IQueryable<CollectionList> query;

            if (type is CollectionListType.All)
            {
                query = baseQuery;
            }
            else if (type is CollectionListType.UnVerified)
            {
                query =
                    from item in baseQuery
                    join verifiedGoodsCollection in _context.VerifiedGoodsCollections
                        on item.CollectionId equals verifiedGoodsCollection.CollectionId
                        into gj
                    from verifiedCollection in gj.DefaultIfEmpty()
                    where verifiedCollection == null
                    select item;
            }
            else if (type is CollectionListType.Verified)
            {
                query=
                from item in baseQuery
                    join verifiedGoodsCollection in _context.VerifiedGoodsCollections
                        on item.CollectionId equals verifiedGoodsCollection.CollectionId
                                 into gj
                    from verifiedCollection in gj.DefaultIfEmpty()
                where verifiedCollection != null
                    select item;
            }
            else
            {
                throw new ArgumentException("Invalid type parameter.");
            }
            return await query.ToListAsync();
        }
                catch(Exception)
        {
            throw;
        }
    }

    public async Task<PagedList<VerifiedCollectionDetail>> GetVerifiedCollections(
        int collectionCenterId,
        FilterRequest request,
        int pageNumber
    )
    {
        try
        {
            var query =
                from collection in _context.GoodsCollections
                join crop in _context.Crops on collection.CropId equals crop.Id
                join verifiedCollection in _context.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join inspector in _context.Inspectors
                on verifiedCollection.InspectorId equals inspector.Id
                join shipmentItem in _context.ShipmentItems
                    on collection.Id equals shipmentItem.CollectionId
                    into shipmentItemsCollection
                from shipmentItem in shipmentItemsCollection.DefaultIfEmpty()
                where shipmentItem == null && collection.CollectionCenterId == collectionCenterId
                // select records which are verified but not added for shiping
                select new VerifiedCollectionDetail()
                {
                    Id = collection.Id,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    Grade = verifiedCollection.Grade,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    InspectorId = inspector.UserId,
                    CollectionDate = collection.CollectionDate
                };
            query = query.ApplyFilters(request);
            var verifiedCollectionDetails = await PagedList<VerifiedCollectionDetail>.ToPagedList(
                query,
                pageNumber
            );
            return verifiedCollectionDetails;
        }
        catch (Exception)
        {
            throw;
        }
    }

     public async Task<VerifiedCollectionDetail> GetVerifiedCollectionDetail(
        int collectionId
    )
    {
        try
        {
            var verifiedCollectionDetail =await(
                from collection in _context.GoodsCollections
                join crop in _context.Crops on collection.CropId equals crop.Id
                join verifiedCollection in _context.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join inspector in _context.Inspectors
                on verifiedCollection.InspectorId equals inspector.Id
                join shipmentItem in _context.ShipmentItems
                    on collection.Id equals shipmentItem.CollectionId
                    into shipmentItemsCollection
                from shipmentItem in shipmentItemsCollection.DefaultIfEmpty()
                where shipmentItem == null && verifiedCollection.CollectionId == collectionId
                // select records which are verified but not added for shiping
                select new VerifiedCollectionDetail()
                {
                    Id = collection.Id,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    Grade = verifiedCollection.Grade,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    InspectorId = inspector.UserId,
                    CollectionDate = collection.CollectionDate
                }).FirstOrDefaultAsync();
            return verifiedCollectionDetail;
        }
        catch (Exception)
        {
            throw;
        }
    }
     public async Task<List<CollectionList>> GetVerifiedCollectionList(
        int collectionCenterId)
    {
        try
        {
            var verifiedCollectionList =await(
                from collection in _context.GoodsCollections
                join crop in _context.Crops on collection.CropId equals crop.Id
                join verifiedCollection in _context.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join inspector in _context.Inspectors
                on verifiedCollection.InspectorId equals inspector.Id
                join shipmentItem in _context.ShipmentItems
                    on collection.Id equals shipmentItem.CollectionId
                    into shipmentItemsCollection
                from shipmentItem in shipmentItemsCollection.DefaultIfEmpty()
                where shipmentItem == null && collection.CollectionCenterId == collectionCenterId
                // select records which are verified but not added for shiping
                select new CollectionList()
                {
                    CollectionId=verifiedCollection.CollectionId,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    CollectionDate = collection.CollectionDate
                }).ToListAsync();
            return verifiedCollectionList;
        }
        catch (Exception)
        {
            throw;
        }
    }


    public async Task<GoodsCollection?> GetById(int collectionId)
    {
        try
        {
            GoodsCollection? collection = await _context.GoodsCollections.FindAsync(collectionId);
            return collection;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(GoodsCollection collection)
    {
        bool status = false;
        try
        {
            await _context.GoodsCollections.AddAsync(collection);
            status = await SaveChanges(_context);
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Update(GoodsCollection collection)
    {
        bool status = false;
        try
        {
            GoodsCollection? oldcollection = await _context.GoodsCollections.FindAsync(
                collection.Id
            );
            if (oldcollection is not null)
            {
                oldcollection.FarmerId = collection.FarmerId;
                oldcollection.CropId = collection.CropId;
                oldcollection.ContainerType = collection.ContainerType;
                oldcollection.Quantity = collection.Quantity;
                oldcollection.Weight = collection.Weight;
                oldcollection.CollectionDate = collection.CollectionDate;
                status = await SaveChanges(_context);
            }
            
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int collectionId)
    {
        bool status = false;
        try
        {
            GoodsCollection? collection = await _context.GoodsCollections.FindAsync(collectionId);
            if (collection is not null)
            {
                _context.GoodsCollections.Remove(collection);
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    private async Task<bool> SaveChanges(GoodsCollectionContext _context)
    {
        int rowsAffected = await _context.SaveChangesAsync();
        return rowsAffected > 0;
    }

    public async Task<List<string?>> GetContainerTypes()
    {
        List<string?> containerTypes = await _context.GoodsCollections
            .Select(collection => collection.ContainerType)
            .Distinct()
            .ToListAsync();

        return containerTypes;
    }

    public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
    {
        try
        {
            var farmercollections = await (
                from collection in _context.GoodsCollections
                join center in _context.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _context.Crops on collection.CropId equals crop.Id
                where collection.FarmerId == farmerId
                select new FarmerCollection()
                {
                    Id = collection.Id,
                    CropName = crop.Title,
                    ImageUrl = crop.ImageUrl,
                    CollectionCenterId = collection.CollectionCenterId,
                    CorporateId = center.CorporateId,
                    ManagerId = center.CorporateId,
                    Quantity = collection.Quantity,
                    ContainerType = collection.ContainerType,
                    Weight = collection.Weight,
                    CollectionDate = collection.CollectionDate
                }
            ).ToListAsync();
            return farmercollections;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId)
    {
        try
        {
            var verifiedcollection = await (
                from collection in _context.GoodsCollections
                join center in _context.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _context.Crops on collection.CropId equals crop.Id
                join verifiedGoodsCollection in _context.VerifiedGoodsCollections
                    on collection.Id equals verifiedGoodsCollection.CollectionId
                where collection.FarmerId == farmerId
                select new FarmerCollection()
                {
                    Id = collection.Id,
                    CropName = crop.Title,
                    ImageUrl = crop.ImageUrl,
                    CollectionCenterId = collection.CollectionCenterId,
                    CorporateId = center.CorporateId,
                    ManagerId = center.CorporateId,
                    Quantity = collection.Quantity,
                    ContainerType = collection.ContainerType,
                    Weight = collection.Weight,
                    CollectionDate = collection.CollectionDate,
                    Grade = verifiedGoodsCollection.Grade,
                    VerifiedWeight = verifiedGoodsCollection.Weight,
                    InspectionDate = verifiedGoodsCollection.InspectionDate
                }
            ).ToListAsync();
            return verifiedcollection;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
    {
        try
        {
            var collections = await (
                from collection in _context.GoodsCollections
                join center in _context.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _context.Crops on collection.CropId equals crop.Id

                join verifiedGoodsCollection in _context.VerifiedGoodsCollections
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
                    ManagerId = center.CorporateId,
                    Quantity = collection.Quantity,
                    ContainerType = collection.ContainerType,
                    Weight = collection.Weight,
                    CollectionDate = collection.CollectionDate
                }
            ).ToListAsync();
            return collections;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
