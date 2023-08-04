using Shipments.Models;
using Shipments.Repositories.Interfaces;
using Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Shipments.Extensions;

namespace Shipments.Repositories
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly IConfiguration _configuration;

        public ShipmentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Shipment>> GetAll()
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await context.Shipments.ToListAsync();
                    return shipments;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<MerchantShipment>?> GetShipmentsByMerchant(
            int merchantId,
            string status
        )
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        where shipment.MerchantId == merchantId && shipment.Status == status
                        select new MerchantShipment()
                        {
                            Id = shipment.Id,
                            VehicleNumber = vehicle.RtoNumber,
                            Kilometers = shipment.Kilometers,
                            DeliveryStatus = shipment.Status,
                            PaymentStatus = context.TransporterPayments.Any(
                                tp => tp.ShipmentId == shipment.Id
                            )
                                ? "paid"
                                : "unpaid",
                            ShipmentDate = shipment.ShipmentDate,
                            FreightCharges = context.TotalFreightCharges(shipment.Id)
                        }
                    ).ToListAsync();
                    return shipments;
                }
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
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        where shipment.Status == ShipmentStatus.Inprogress
                        select new InprogressShipment()
                        {
                            Id = shipment.Id,
                            VehicleNumber = vehicle.RtoNumber
                        }
                    ).ToListAsync();
                    return shipments;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ShipmentItemDetails>> GetShipmentItemsById(int shipmentId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentItems = await (
                        from shipmentItem in context.ShipmentItems
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where shipmentItem.ShipmentId == shipmentId
                        select new ShipmentItemDetails()
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
                    return shipmentItems;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Shipment> GetById(int shipmentId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipment = await context.Shipments.FindAsync(shipmentId);

                    if (shipment is null)
                    {
                        return null;
                    }

                    return shipment;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<TransporterAmount> GetTransporterAmountByShipmentId(int shipmentId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var transporterAmount = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        where shipment.Id == shipmentId
                        select new TransporterAmount()
                        {
                            TransporterId = vehicle.TransporterId,
                            PaymentStatus = context.TransporterPayments.Any(
                                tp => tp.ShipmentId == shipment.Id
                            )
                                ? "paid"
                                : "unpaid",
                            Amount = context.TotalFreightCharges(shipment.Id)
                        }
                    ).FirstOrDefaultAsync();
                    return transporterAmount;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Insert(Shipment shipment)
        {
            try
            {
                bool status = false;
                if (await IsShipmentAlredyInprogress(shipment))
                {
                    return status;
                }
                using (var context = new ShipmentContext(_configuration))
                {
                    await context.Shipments.AddAsync(shipment);
                    status = await SaveChanges(context);
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private async Task<bool> IsShipmentAlredyInprogress(Shipment shipment)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    status = await context.Shipments.AnyAsync(
                        s =>
                            s.VehicleId == shipment.VehicleId
                            && s.Status == ShipmentStatus.Inprogress
                    );
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentStatus = await context.Shipments
                        .Where(shipment => shipment.Id == shipmentId)
                        .Select(shipment => shipment.Status)
                        .FirstOrDefaultAsync();

                    if (shipmentStatus is ShipmentStatus.Delivered)
                    {
                        status = true;
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipment = await context.Shipments.FindAsync(shipmentId);

                    if (shipment == null)
                    {
                        return false;
                    }
                    shipment.Status = statusObject.Status;
                    status = await SaveChanges(context);

                    if (status && statusObject.Status == ShipmentStatus.Delivered)
                    {
                        context.Database.ExecuteSqlRaw(
                            "CALL call_procedures_after_shipment_status_delivered(@p0)",
                            shipmentId
                        );
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Update(Shipment shipment)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var oldshipment = await context.Shipments.FindAsync(shipment.Id);
                    if (oldshipment is not null)
                    {
                        oldshipment.VehicleId = shipment.VehicleId;
                        oldshipment.MerchantId = shipment.MerchantId;
                        oldshipment.Kilometers = shipment.Kilometers;
                        oldshipment.Status = shipment.Status;
                        oldshipment.ShipmentDate = shipment.ShipmentDate;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int shipmentId)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipment = await context.Shipments.FindAsync(shipmentId);
                    if (shipment is not null)
                    {
                        context.Shipments.Remove(shipment);
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private async Task<bool> SaveChanges(ShipmentContext context)
        {
            int rowsAffected = await context.SaveChangesAsync();
            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from merchant in context.Merchants
                        join shipment in context.Shipments on merchant.Id equals shipment.MerchantId
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
                    return shipments;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(
            int transporterId
        )
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from transporter in context.Transporters
                        join vehicle in context.Vehicles
                            on transporter.Id equals vehicle.TransporterId
                        join shipment in context.Shipments on vehicle.Id equals shipment.VehicleId
                        join merchant in context.Merchants on shipment.MerchantId equals merchant.Id
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
                    return shipments;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public PagedList<ShippedCollection> GetShippedCollections(
            int collectionCenterId,
            string shipmentStatus,
             FilterRequest request,
            int pageNumber

        )
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var query = 
                        from shipment in context.Shipments
                        join shipmentItem in context.ShipmentItems
                            on shipment.Id equals shipmentItem.ShipmentId
                        join merchant in context.Merchants on shipment.MerchantId equals merchant.Id
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
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
                    query=query.ApplyFilters(request);
                    return PagedList<ShippedCollection>.ToPagedList(query,pageNumber);

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<CollectionCount>> GetCollectionCounts(int merchantId)
        {
            try{
                using(var context=new ShipmentContext(_configuration)){
                    var collectionCounts=await (
                        from collectioncenter in context.CollectionCenters
                        join goodscollection in context.GoodsCollections
                        on collectioncenter.Id equals goodscollection.CollectionCenterId
                        join shipmentitem in context.ShipmentItems
                        on goodscollection.Id equals shipmentitem.CollectionId
                        join shipment in context.Shipments
                        on shipmentitem.ShipmentId equals shipment.Id
                        where shipment.MerchantId == merchantId group new {goodscollection,collectioncenter} by collectioncenter.Id
                        into c
                        select new CollectionCount(){
                        CollectionCenterId=c.Key,
                        CorporateId=c.FirstOrDefault().collectioncenter.CorporateId,
                        Count=c.Count()    
                        }).ToListAsync();
                        return collectionCounts;
                }
            }
            catch(Exception e){
                throw e;
            }
        }

        public async Task<List<CropCount>> GetCropCounts(int merchantId)
        {
           try{
            using(var context=new ShipmentContext(_configuration)){
                var cropCounts=await (from crop in context.Crops
                                      join goodscollection in context.GoodsCollections
                                      on crop.Id equals goodscollection.CropId
                                      join shipmentitem in context.ShipmentItems
                                      on goodscollection.Id equals shipmentitem.CollectionId
                                      join shipment in context.Shipments
                                      on shipmentitem.ShipmentId equals shipment.Id
                                      where shipment.MerchantId == merchantId group new {crop,goodscollection} by goodscollection.CropId into c
                                      select new CropCount(){
                                        Count=c.Count(),
                                        CropName=c.FirstOrDefault().crop.Title
                                      }).ToListAsync();
                                      return cropCounts;
            }
           }
           catch(Exception e){
            throw e;
           }
        }
    }
}
