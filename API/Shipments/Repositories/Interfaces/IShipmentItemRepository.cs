using Transflower.EAgroServices.Shipments.Entities;

namespace Transflower.EAgroServices.Shipments.Repositories.Interfaces;

public interface IShipmentItemRepository
{
    Task<List<ShipmentItem>> GetAll();
    Task<ShipmentItem?> GetById(int shipmentItemId);
    Task<bool> Insert(ShipmentItem shipmentItem);
    Task<bool> Update(ShipmentItem shipmentItem);
    Task<bool> Delete(int shipmentItemId);
}
