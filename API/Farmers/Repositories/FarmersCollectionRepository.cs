using Transflower.EAgroServices.Farmers.Models;
using Transflower.EAgroServices.Farmers.Repositories.Interfaces;
using Transflower.EAgroServices.Farmers.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
namespace Transflower.EAgroServices.Farmers.Repositories;
public class FarmersCollectionRepository : IFarmersCollectionRepository
{
    private readonly FarmerContext _farmerContext;
    public FarmersCollectionRepository(FarmerContext farmerContext)
    {
        _farmerContext = farmerContext;
    }
    public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
    {
        try
        {
            List<FarmerCollection> farmercollections = await (
                from collection in _farmerContext.GoodsCollections
                join center in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id
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
    public async Task<List<FarmerCollection>> GetVerifiedCollection(
        int farmerId,
        string paymentStatus
    )
    {
        try
        {
            List<FarmerCollection> verifiedcollection = await (
                from collection in _farmerContext.GoodsCollections
                join center in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id
                join verifiedGoodsCollection in _farmerContext.VerifiedGoodsCollections
                    on collection.Id equals verifiedGoodsCollection.CollectionId
                join shipmentiteam in _farmerContext.ShipmentItems
                    on verifiedGoodsCollection.CollectionId equals shipmentiteam.CollectionId
                join invoice in _farmerContext.Invoices
                    on shipmentiteam.Id equals invoice.ShipmentItemId
                where collection.FarmerId == farmerId && invoice.PaymentStatus == paymentStatus
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
                    InspectionDate = verifiedGoodsCollection.InspectionDate,
                    PaymentStatus = invoice.PaymentStatus
                }
            ).ToListAsync();
            return verifiedcollection;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<FarmerCollection>> VerifiedCollection(int farmerId)
    {
        try
        {
            List<FarmerCollection> verifiedcollection = await (
                from collection in _farmerContext.GoodsCollections
                join center in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id
                join verifiedGoodsCollection in _farmerContext.VerifiedGoodsCollections
                    on collection.Id equals verifiedGoodsCollection.CollectionId
                join shipmentiteam in _farmerContext.ShipmentItems
                    on verifiedGoodsCollection.CollectionId equals shipmentiteam.CollectionId
                join invoice in _farmerContext.Invoices
                    on shipmentiteam.Id equals invoice.ShipmentItemId
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
                    InspectionDate = verifiedGoodsCollection.InspectionDate,
                    PaymentStatus = invoice.PaymentStatus
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
            List<FarmerCollection> farmerCollections = await (
                from collection in _farmerContext.GoodsCollections
                join center in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals center.Id
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id

                join verifiedGoodsCollection in _farmerContext.VerifiedGoodsCollections
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
            return farmerCollections;
        }
        catch (Exception)
        {
            throw;
        }
    }
    public async Task<List<Revenue>> MonthlyRevenue(int farmerId)
    {
        try
        {
            List<Revenue> monthlyRevenue = await (
                from invoice in _farmerContext.Invoices
                join shipmentItem in _farmerContext.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join collection in _farmerContext.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _farmerContext.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                where collection.FarmerId == farmerId
                group new { invoice, shipmentItem } by invoice.InvoiceDate.Month into g
                orderby g.Key
                select new Revenue()
                {
                    InvoiceDate = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                    TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                }
            ).ToListAsync();
            return monthlyRevenue;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<Revenue>> YearRevenue(int farmerId)
    {
        try
        {
            List<Revenue> yearRevenue = await (
                from invoice in _farmerContext.Invoices
                join shipmentItem in _farmerContext.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join collection in _farmerContext.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _farmerContext.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                where collection.FarmerId == farmerId
                group new { invoice, shipmentItem } by invoice.InvoiceDate.Year into g
                orderby g.Key
                select new Revenue()
                {
                    Year = g.Key,
                    TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                }
            ).ToListAsync();
            return yearRevenue;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<CropRevenue>> CropRevenue(int farmerId)
    {
        try
        {
            List<CropRevenue> cropRevenue = await (
                from invoice in _farmerContext.Invoices
                join shipmentItem in _farmerContext.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join collection in _farmerContext.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _farmerContext.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _farmerContext.VerifiedGoodsCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id
                where collection.FarmerId == farmerId && invoice.PaymentStatus == "paid"
                group new
                {
                    invoice,
                    shipmentItem,
                    crop
                } by crop.Title into g
                orderby g.Key
                select new CropRevenue()
                {
                    CropName = g.Key,
                    TotalAmount = g.Sum(item => item.invoice.TotalAmount)
                }
            ).ToListAsync();
            return cropRevenue;
        }
        catch (Exception)
        {
            throw;
        }
    }


 public async Task<List<CollectionList>> CollectionList(int farmerId)
    {
        try
        {
              List<CollectionList> collectionsList = await (
                from collection in _farmerContext.GoodsCollections
                join center in _farmerContext.CollectionCenters
                on collection.CollectionCenterId equals center.Id
                join crop in _farmerContext.Crops on collection.CropId equals crop.Id
                where collection.FarmerId == farmerId
                select new CollectionList()
                {
                    Id = collection.Id,
                    CropName = crop.Title,
                    Quantity = collection.Quantity,
                    CollectionDate = collection.CollectionDate
                }
            ).ToListAsync();
            return collectionsList;
        }
        catch (Exception)
        {
            throw;
        }
    }



}
