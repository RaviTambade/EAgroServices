using Shipments.Services.Interfaces;
using Shipments.Repositories.Interfaces;
using Shipments.Models;
using Shipments.Entities;

namespace Shipments.Services
{
    public class ShipmentItemService : IShipmentItemService
    {
        private readonly IShipmentItemRepository _repo;

        public ShipmentItemService(IShipmentItemRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ShipmentItem>> GetAll()
        {
            return await _repo.GetAll();
        }

        public async Task<ShipmentItem?> GetById(int shipmentItemId)
        {
            return await _repo.GetById(shipmentItemId);
        }

        public async Task<bool> Insert(ShipmentItem shipmentItem)
        {
            return await _repo.Insert(shipmentItem);
        }

        public async Task<bool> Update(ShipmentItem shipmentItem)
        {
            return await _repo.Update(shipmentItem);
        }

        public async Task<bool> Delete(int shipmentItemId)
        {
            return await _repo.Delete(shipmentItemId);
        }
    }
}
