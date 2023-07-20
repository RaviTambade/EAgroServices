using Shipments.Models;
using Shipments.Repositories.Interfaces;
using Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

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
                    if (shipments is null)
                    {
                        return null;
                    }
                    return shipments;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<MerchantShipment>> GetShipmentsByMerchant(int merchantId,string status)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        where shipment.MerchantId == merchantId && shipment.Status==status
                        select new MerchantShipment()
                        {
                            Id = shipment.Id,
                            VehicleNumber = vehicle.RtoNumber,
                            Kilometers = shipment.Kilometers,
                            DeliveryStatus = shipment.Status,
                            PaymentStatus=context.TransporterPayments.Any(tp => tp.ShipmentId == shipment.Id) ? "paid" : "unpaid",
                            ShipmentDate = shipment.ShipmentDate,
                            FreightCharges=context.TotalFreightCharges(shipment.Id)
                        }
                    ).ToListAsync();

                    if (shipments is null)
                    {
                        return null;
                    }
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
                    if (shipmentItems is null)
                    {
                        return null;
                    }
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

        public async Task<bool> Insert(Shipment shipment)
        {
            try
            {
                bool status = false;
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

                    if (shipmentStatus is "delivered")
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

                    if (status && statusObject.Status == "delivered")
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

        public async Task<List<Shipment>> GetShipmentByVehicleId(int vehicleId){
            try{
                using(var context=new ShipmentContext(_configuration)){
                    var shipments=await context.Shipments.Where(v=>v.VehicleId==vehicleId).ToListAsync();
                    return shipments;
                }
            }
            catch(Exception e){
                throw e;
            }
        }
    }
}
