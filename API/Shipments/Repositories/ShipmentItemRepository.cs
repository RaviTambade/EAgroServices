
using Shipments.Models;
using Shipments.Repositories.Interfaces;
using Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;


namespace Shipments.Repositories
{
    public class ShipmentItemRepository : IShipmentItemRepository
    { 
        private readonly IConfiguration _configuration;

        public ShipmentItemRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

          public async Task<List<ShipmentItem>> GetAll()
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentItems = await context.ShipmentItems.ToListAsync();
                    return shipmentItems;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ShipmentItem?> GetById(int ShipmentItemId)
        {
            try
            {
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentItem = await context.ShipmentItems.FindAsync(ShipmentItemId);
                    return shipmentItem;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Insert(ShipmentItem shipmentItem)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    await context.ShipmentItems.AddAsync(shipmentItem);
                    status = await SaveChanges(context);
                    return status;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Update(ShipmentItem shipmentItem)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var oldShipmentItem = await context.ShipmentItems.FindAsync(shipmentItem.Id);
                    if (oldShipmentItem is not null)
                    {
                        oldShipmentItem.ShipmentId = shipmentItem.ShipmentId;
                        oldShipmentItem.CollectionId = shipmentItem.CollectionId;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Delete(int ShipmentItemId)
        {
            try
            {
                bool status = false;
                using (var context = new ShipmentContext(_configuration))
                {
                    var shipmentItem = await context.ShipmentItems.FindAsync(ShipmentItemId);
                    if (shipmentItem is not null)
                    {
                        context.ShipmentItems.Remove(shipmentItem);
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception)
            {
                throw;
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