
using Shipments.Entities;

namespace Shipments.Repositories.Interfaces
{
    public interface IShipmentItemRepository
    {
        Task<List<ShipmentItem>> GetAll();
        Task<ShipmentItem?> GetById(int shipmentItemId);
        Task<bool> Insert(ShipmentItem shipmentItem);
        Task<bool> Update(ShipmentItem shipmentItem);
        Task<bool> Delete(int shipmentItemId);
    }
}