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

        public async Task<List<MerchantShipment>> GetShipmentsByMerchant(int merchantId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipments = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        where shipment.MerchantId == merchantId
                        select new MerchantShipment()
                        {
                            Id = shipment.Id,
                            VehicleNumber = vehicle.RtoNumber,
                            Kilometers = shipment.Kilometers,
                            Status = shipment.Status,
                            ShipmentDate = shipment.ShipmentDate,
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

        public async Task<List<ShipmentItem>> GetShipmentItemsById(int shipmentId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentItems = await context.ShipmentItems
                        .Where(si => si.ShipmentId == shipmentId)
                        .ToListAsync();
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
    }
}
