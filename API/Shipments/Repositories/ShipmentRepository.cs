using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Entities;
using Transflower.EAgroServices.Shipments.Repositories.Interfaces;
using Transflower.EAgroServices.Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Shipments.Extensions;

namespace Transflower.EAgroServices.Shipments.Repositories;

public class ShipmentRepository : IShipmentRepository
{
    private readonly ShipmentContext _context;

    public ShipmentRepository(ShipmentContext context)
    {
        _context = context;
    }

    public async Task<List<Shipment>> GetAll()
    {
        try
        {
            var shipments = await _context.Shipments.ToListAsync();
            return shipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<MerchantShipment>?> GetInprogressShipmentsByMerchant(int merchantId)
    {
        try
        {
            var merchantShipments = await (
                from shipment in _context.Shipments
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                where
                    shipment.MerchantId == merchantId
                    && shipment.Status == ShipmentStatus.Inprogress
                select new MerchantShipment()
                {
                    Id = shipment.Id,
                    VehicleNumber = vehicle.RtoNumber,
                    Kilometers = shipment.Kilometers,
                    DeliveryStatus = shipment.Status,
                    PaymentStatus = PaymentStatus.UnPaid,
                    ShipmentDate = shipment.ShipmentDate,
                    FreightCharges = _context.TotalFreightCharges(shipment.Id)
                }
            ).ToListAsync();
            return merchantShipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<MerchantShipment>?> GetDeliveredShipmentsByMerchant(
        int merchantId,
        string paymentStatus
    )
    {
        try
        {
            var merchantShipments = await (
                from shipment in _context.Shipments
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                where
                    shipment.MerchantId == merchantId && shipment.Status == ShipmentStatus.Delivered
                let calculatedPaymentStatus = _context.TransporterPayments.Any(
                    tp => tp.ShipmentId == shipment.Id
                )
                    ? PaymentStatus.Paid
                    : PaymentStatus.UnPaid
                where calculatedPaymentStatus == paymentStatus
                select new MerchantShipment()
                {
                    Id = shipment.Id,
                    VehicleNumber = vehicle.RtoNumber,
                    Kilometers = shipment.Kilometers,
                    DeliveryStatus = shipment.Status,
                    PaymentStatus = calculatedPaymentStatus,
                    ShipmentDate = shipment.ShipmentDate,
                    FreightCharges = _context.TotalFreightCharges(shipment.Id)
                }
            ).ToListAsync();

            return merchantShipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<InprogressShipment>> GetInprogressShipments()
    {
        try
        {
            var inprogressShipments = await (
                from shipment in _context.Shipments
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                where shipment.Status == ShipmentStatus.Inprogress
                select new InprogressShipment()
                {
                    Id = shipment.Id,
                    MerchantCorporateId = merchant.CorporateId,
                    VehicleNumber = vehicle.RtoNumber
                }
            ).ToListAsync();
            return inprogressShipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<ShipmentItemDetail>> GetShipmentItemsById(int shipmentId)
    {
        try
        {
            var shipmentItemDetails = await (
                from shipmentItem in _context.ShipmentItems
                join collection in _context.GoodsCollections
                    on shipmentItem.CollectionId equals collection.Id
                join collectionCenter in _context.CollectionCenters
                    on collection.CollectionCenterId equals collectionCenter.Id
                join verifiedCollection in _context.VerifiedCollections
                    on collection.Id equals verifiedCollection.CollectionId
                join crop in _context.Crops on collection.CropId equals crop.Id
                where shipmentItem.ShipmentId == shipmentId
                select new ShipmentItemDetail()
                {
                    Id = shipmentItem.Id,
                    CollectionCenterCorporaterId = collectionCenter.CorporateId,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    Grade = verifiedCollection.Grade,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    CollectionDate = collection.CollectionDate
                }
            ).ToListAsync();
            return shipmentItemDetails;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Shipment?> GetById(int shipmentId)
    {
        try
        {
            var shipment = await _context.Shipments.FindAsync(shipmentId);
            return shipment;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<TransporterAmount?> GetTransporterAmountByShipmentId(int shipmentId)
    {
        try
        {
            var transporterAmount = await (
                from shipment in _context.Shipments
                join vehicle in _context.Vehicles on shipment.VehicleId equals vehicle.Id
                where shipment.Id == shipmentId
                select new TransporterAmount()
                {
                    TransporterId = vehicle.TransporterId,
                    PaymentStatus = _context.TransporterPayments.Any(
                        tp => tp.ShipmentId == shipment.Id
                    )
                        ? "paid"
                        : "unpaid",
                    Amount = _context.TotalFreightCharges(shipment.Id)
                }
            ).FirstOrDefaultAsync();
            return transporterAmount;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Shipment shipment)
    {
        bool status = false;
        try
        {
            if (await IsShipmentAlredyInprogress(shipment))
            {
                return status;
            }

            await _context.Shipments.AddAsync(shipment);
            status = await SaveChanges(_context);
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    private async Task<bool> IsShipmentAlredyInprogress(Shipment shipment)
    {
        bool status = false;
        try
        {
            status = await _context.Shipments.AnyAsync(
                s => s.VehicleId == shipment.VehicleId && s.Status == ShipmentStatus.Inprogress
            );
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
    {
        bool status = false;
        try
        {
            var shipmentStatus = await _context.Shipments
                .Where(shipment => shipment.Id == shipmentId)
                .Select(shipment => shipment.Status)
                .FirstOrDefaultAsync();

            if (shipmentStatus is ShipmentStatus.Delivered)
            {
                status = true;
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject)
    {
        bool status = false;
        try
        {
            var shipment = await _context.Shipments.FindAsync(shipmentId);

            if (shipment == null)
            {
                return false;
            }
            shipment.Status = statusObject.Status;
            status = await SaveChanges(_context);

            if (status && statusObject.Status == ShipmentStatus.Delivered)
            {
                _context.Database.ExecuteSqlRaw(
                    "CALL call_procedures_after_shipment_status_delivered(@p0)",
                    shipmentId
                );
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Update(Shipment shipment)
    {
        bool status = false;
        try
        {
            var oldshipment = await _context.Shipments.FindAsync(shipment.Id);
            if (oldshipment is not null)
            {
                oldshipment.VehicleId = shipment.VehicleId;
                oldshipment.MerchantId = shipment.MerchantId;
                oldshipment.Kilometers = shipment.Kilometers;
                oldshipment.Status = shipment.Status;
                oldshipment.ShipmentDate = shipment.ShipmentDate;
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int shipmentId)
    {
        bool status = false;
        try
        {
            var shipment = await _context.Shipments.FindAsync(shipmentId);
            if (shipment is not null)
            {
                _context.Shipments.Remove(shipment);
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    private async Task<bool> SaveChanges(ShipmentContext _context)
    {
        int rowsAffected = await _context.SaveChangesAsync();
        return rowsAffected > 0;
    }

    public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
    {
        try
        {
            var corporateShipments = await (
                from merchant in _context.Merchants
                join shipment in _context.Shipments on merchant.Id equals shipment.MerchantId
                where shipment.VehicleId == vehicleId
                select new CorporateShipment()
                {
                    CorporateId = merchant.CorporateId,
                    Id = shipment.Id,
                    VehicleId = shipment.VehicleId,
                    MerchantId = shipment.MerchantId,
                    Kilometers = shipment.Kilometers,
                    Status = shipment.Status,
                    ShipmentDate = shipment.ShipmentDate
                }
            ).ToListAsync();
            return corporateShipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId)
    {
        try
        {
            var vehicleCorporateShipments = await (
                from transporter in _context.Transporters
                join vehicle in _context.Vehicles on transporter.Id equals vehicle.TransporterId
                join shipment in _context.Shipments on vehicle.Id equals shipment.VehicleId
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                where transporter.Id == transporterId
                select new VehicleCorporateShipment()
                {
                    ShipmentId = shipment.Id,
                    VehicleId = shipment.VehicleId,
                    CorporateId = merchant.CorporateId,
                    VehicleType = vehicle.VehicleType,
                    RtoNumber = vehicle.RtoNumber,
                    Kilometers = shipment.Kilometers,
                    Status = shipment.Status,
                    ShipmentDate = shipment.ShipmentDate
                }
            ).ToListAsync();
            return vehicleCorporateShipments;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<PagedList<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus,
        FilterRequest request,
        int pageNumber
    )
    {
        try
        {
            var query =
                from shipment in _context.Shipments
                join shipmentItem in _context.ShipmentItems
                    on shipment.Id equals shipmentItem.ShipmentId
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
                    collection.CollectionCenterId == collectionCenterId
                    && shipment.Status == shipmentStatus
                select new ShippedCollection()
                {
                    CollectionId = collection.Id,
                    CollectionCenterCorporateId = collectionCenter.CorporateId,
                    MerchantCorporateId = merchant.CorporateId,
                    TransporterCorporateId = transporter.CorporateId,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    VehicleNumber = vehicle.RtoNumber,
                    Grade = verifiedCollection.Grade,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    CollectionDate = collection.CollectionDate,
                    ShipmentDate = shipment.ShipmentDate
                };
            query = query.ApplyFilters(request);
            var shippedCollections = await PagedList<ShippedCollection>.ToPagedList(
                query,
                pageNumber
            );
            return shippedCollections;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus
    )
    {
        try
        {
            var shippedCollection =await
               ( from shipment in _context.Shipments
                join shipmentItem in _context.ShipmentItems
                    on shipment.Id equals shipmentItem.ShipmentId
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
                    collection.CollectionCenterId == collectionCenterId
                    && shipment.Status == shipmentStatus
                select new ShippedCollection()
                {
                    CollectionId = collection.Id,
                    CollectionCenterCorporateId = collectionCenter.CorporateId,
                    MerchantCorporateId = merchant.CorporateId,
                    TransporterCorporateId = transporter.CorporateId,
                    FarmerId = collection.FarmerId,
                    CropName = crop.Title,
                    VehicleNumber = vehicle.RtoNumber,
                    Grade = verifiedCollection.Grade,
                    ContainerType = collection.ContainerType,
                    Quantity = collection.Quantity,
                    TotalWeight = collection.Weight,
                    NetWeight = verifiedCollection.Weight,
                    CollectionDate = collection.CollectionDate,
                    ShipmentDate = shipment.ShipmentDate
                }).ToListAsync();
            return shippedCollection;
        }
        catch (Exception)
        {
            throw;
        }
    }
}


