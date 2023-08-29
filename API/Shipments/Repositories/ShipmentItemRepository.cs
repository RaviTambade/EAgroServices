using Transflower.EAgroServices.Shipments.Repositories.Interfaces;
using Transflower.EAgroServices.Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Shipments.Entities;

namespace Transflower.EAgroServices.Shipments.Repositories;

public class ShipmentItemRepository : IShipmentItemRepository
{
    private readonly ShipmentContext _context;

    public ShipmentItemRepository(ShipmentContext context)
    {
        _context = context;
    }

    public async Task<List<ShipmentItem>> GetAll()
    {
        try
        {
            var shipmentItems = await _context.ShipmentItems.ToListAsync();
            return shipmentItems;
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
            var shipmentItem = await _context.ShipmentItems.FindAsync(ShipmentItemId);
            return shipmentItem;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(ShipmentItem shipmentItem)
    {
        bool status = false;
        try
        {
            await _context.ShipmentItems.AddAsync(shipmentItem);
            status = await SaveChanges(_context);
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Update(ShipmentItem shipmentItem)
    {
        bool status = false;
        try
        {
            var oldShipmentItem = await _context.ShipmentItems.FindAsync(shipmentItem.Id);
            if (oldShipmentItem is not null)
            {
                oldShipmentItem.ShipmentId = shipmentItem.ShipmentId;
                oldShipmentItem.CollectionId = shipmentItem.CollectionId;
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int ShipmentItemId)
    {
        bool status = false;
        try
        {
            var shipmentItem = await _context.ShipmentItems.FindAsync(ShipmentItemId);
            if (shipmentItem is not null)
            {
                _context.ShipmentItems.Remove(shipmentItem);
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
}
