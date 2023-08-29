using Transflower.Invoices.Models;
using Transflower.Invoices.Entities;
using Transflower.Invoices.Repositories.Interfaces;
using Transflower.Invoices.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.Invoices.Extensions;

namespace Transflower.Invoices.Repositories;

public class InvoiceRepository : IInvoiceRepository
{
    private readonly InvoiceContext _context;

    public InvoiceRepository(InvoiceContext context)
    {
        _context = context;
    }

    public async Task<List<InvoiceDetail>> GetAll(int merchantId, string paymentStatus)
    {
        try
        {

            var invoices = await (
                from invoice in _context.Invoices
                join shipmentItem in _context.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join charges in _context.GoodsCostings
                    on shipmentItem.Id equals charges.ShipmentItemId
                join shipment in _context.Shipments
                    on shipmentItem.ShipmentId equals shipment.Id
                join collection in _context.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join verifiedCollection in _context.VerifiedCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _context.Crops on collection.CropId equals crop.Id
                where
                    shipment.MerchantId == merchantId
                    && invoice.PaymentStatus == paymentStatus
                select new InvoiceDetail()
                {
                    Id = invoice.Id,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    Quantity = collection.Quantity,
                    Weight = verifiedCollection.Weight,
                    RatePerKg = invoice.RatePerKg,
                    PaymentStatus = invoice.PaymentStatus,
                    TotalAmount = invoice.TotalAmount + charges.LabourCharges + charges.ServiceCharges,
                    InvoiceDate = invoice.InvoiceDate
                }
            ).ToListAsync();
            return invoices;

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<PagedList<CollectionCenterInvoice>> GetCollectionCenterInvoices(
        int collectionCenterId,
        string status,
        FilterRequest request,
        int pageNumber
    )
    {
        try
        {
            var query =
                from invoice in _context.Invoices
                join shipmentItem in _context.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join shipment in _context.Shipments
                    on shipmentItem.ShipmentId equals shipment.Id
                join charges in _context.GoodsCostings
                    on shipmentItem.Id equals charges.ShipmentItemId
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                join collection in _context.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join verifiedCollection in _context.VerifiedCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _context.Crops on collection.CropId equals crop.Id
                where
                    collection.CollectionCenterId == collectionCenterId
                    && invoice.PaymentStatus == status
                orderby invoice.InvoiceDate descending
                select new CollectionCenterInvoice()
                {
                    Id = invoice.Id,
                    MerchantCorporateId = merchant.CorporateId,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    Quantity = collection.Quantity,
                    Weight = verifiedCollection.Weight,
                    RatePerKg = invoice.RatePerKg,
                    TotalAmount = charges.ServiceCharges + charges.LabourCharges,
                    InvoiceDate = invoice.InvoiceDate
                };
            query = query.ApplyFilters(request);
            return await PagedList<CollectionCenterInvoice>.ToPagedList(query, pageNumber);

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<InvoiceChargesDetail?> GetById(int invoiceId)
    {
        try
        {
            var invoiceDetail = await (
  from invoice in _context.Invoices
  join shipmentItem in _context.ShipmentItems
      on invoice.ShipmentItemId equals shipmentItem.Id
  join charges in _context.GoodsCostings
      on shipmentItem.Id equals charges.ShipmentItemId
  join shipment in _context.Shipments
      on shipmentItem.ShipmentId equals shipment.Id
  join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
  join transporter in _context.Transporters
      on vehicle.TransporterId equals transporter.Id
  join collection in _context.GoodsCollections
      on shipmentItem.CollectionId equals collection.Id
  join collectionCenter in _context.CollectionCenters
      on collection.CollectionCenterId equals collectionCenter.Id
  join verifiedCollection in _context.VerifiedCollections
      on collection.Id equals verifiedCollection.CollectionId
  join crop in _context.Crops on collection.CropId equals crop.Id
  where invoice.Id == invoiceId
  select new InvoiceChargesDetail()
  {
      Id = invoice.Id,
      FarmerId = collection.FarmerId,
      CollectionId = collection.Id,
      CollectionCenterCorporateId = collectionCenter.CorporateId,
      TransporterCorporateId = transporter.CorporateId,
      VehicleNumber = vehicle.RtoNumber,
      CropName = crop.Title,
      Grade = verifiedCollection.Grade,
      ContainerType = collection.ContainerType,
      Quantity = collection.Quantity,
      TotalWeight = collection.Weight,
      NetWeight = verifiedCollection.Weight,
      FreightCharges = charges.FreightCharges,
      LabourCharges = charges.LabourCharges,
      PaymentStatus = invoice.PaymentStatus,
      ServiceCharges = charges.ServiceCharges,
      RatePerKg = invoice.RatePerKg,
      FarmerAmount = invoice.TotalAmount,
      InvoiceDate = invoice.InvoiceDate
  }
).FirstOrDefaultAsync();

            return invoiceDetail;

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<FarmerInvoice?> GetInvoice(int collectionId)
    {
        try
        {
            var invoiceDetail = await (
                from invoice in _context.Invoices
                join shipmentItem in _context.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join charges in _context.GoodsCostings
                    on shipmentItem.Id equals charges.ShipmentItemId
                join shipment in _context.Shipments
                    on shipmentItem.ShipmentId equals shipment.Id
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                join transporter in _context.Transporters
                    on vehicle.TransporterId equals transporter.Id
                join collection in _context.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _context.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _context.VerifiedCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _context.Crops on collection.CropId equals crop.Id
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                where shipmentItem.CollectionId == collectionId
                select new FarmerInvoice()
                {
                    MerchantCorporateId = merchant.CorporateId,
                    CollectionCenterCorporateId = collectionCenter.CorporateId,
                    TransporterCorporateId = transporter.CorporateId,
                    VehicleNumber = vehicle.RtoNumber,
                    CropName = crop.Title,
                    Grade = verifiedCollection.Grade,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    FreightCharges = charges.FreightCharges,
                    LabourCharges = charges.LabourCharges,
                    PaymentStatus = invoice.PaymentStatus,
                    ServiceCharges = charges.ServiceCharges,
                    RatePerKg = invoice.RatePerKg,
                    FarmerAmount = invoice.TotalAmount,
                    InvoiceDate = invoice.InvoiceDate
                }
            ).FirstOrDefaultAsync();
            return invoiceDetail;

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Invoice invoice)
    {
        try
        {
            bool status = false;

            await _context.Invoices.AddAsync(invoice);
            status = await SaveChanges(_context);
            return status;

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Update(int invoiceId, UpdateRate rate)
    {
        try
        {
            bool status = false;

            var oldInvoice = await _context.Invoices.FindAsync(invoiceId);
            if (oldInvoice is not null)
            {
                oldInvoice.RatePerKg = rate.RatePerKg;
                status = await SaveChanges(_context);
            }
            if (status)
                _context.Database.ExecuteSqlRaw(
                    "CALL calculate_total_amount(@p0)",
                    invoiceId
                );
            return status;

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Delete(int invoiceId)
    {
        try
        {
            bool status = false;

            var invoice = await _context.Invoices.FindAsync(invoiceId);
            if (invoice is not null)
            {
                _context.Invoices.Remove(invoice);
                status = await SaveChanges(_context);
            }
            return status;

        }
        catch (Exception)
        {
            throw;
        }
    }

    private async Task<bool> SaveChanges(InvoiceContext context)
    {
        int rowsAffected = await context.SaveChangesAsync();
        if (rowsAffected > 0)
        {
            return true;
        }
        return false;
    }

    public async Task<CollectionCenterInvoiceDetail?> GetCollectionCenterInvoiceDetails(
        int collectionCenterId,
        int invoiceId
    )
    {
        try
        {
            var invoiceDetail = await (
                from invoice in _context.Invoices
                join shipmentItem in _context.ShipmentItems
                    on invoice.ShipmentItemId equals shipmentItem.Id
                join charges in _context.GoodsCostings
                    on shipmentItem.Id equals charges.ShipmentItemId
                join shipment in _context.Shipments
                    on shipmentItem.ShipmentId equals shipment.Id
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                join transporter in _context.Transporters
                    on vehicle.TransporterId equals transporter.Id
                join collection in _context.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _context.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _context.VerifiedCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _context.Crops on collection.CropId equals crop.Id
                where
                    invoice.Id == invoiceId
                    && collection.CollectionCenterId == collectionCenterId
                select new CollectionCenterInvoiceDetail()
                {
                    FarmerId = collection.FarmerId,
                    MerchantCorporateId = merchant.CorporateId,
                    TransporterCorporateId = transporter.CorporateId,
                    VehicleNumber = vehicle.RtoNumber,
                    CropName = crop.Title,
                    Grade = verifiedCollection.Grade,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    FreightCharges = charges.FreightCharges,
                    LabourCharges = charges.LabourCharges,
                    ServiceCharges = charges.ServiceCharges,
                    RatePerKg = invoice.RatePerKg,
                    FarmerAmount = invoice.TotalAmount,
                    InvoiceDate = invoice.InvoiceDate
                }
            ).FirstOrDefaultAsync();

            return invoiceDetail;

        }
        catch (Exception)
        {
            throw;
        }
    }
}

