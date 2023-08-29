using Transflower.EAgroServices.Shipments.Services.Interfaces;
using Transflower.EAgroServices.Shipments.Repositories.Interfaces;
using Transflower.EAgroServices.Shipments.Entities;

namespace Transflower.EAgroServices.Shipments.Services
{
    public class ShipmentItemService : IShipmentItemService
    {
        private readonly IShipmentItemRepository _repository;

        public ShipmentItemService(IShipmentItemRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ShipmentItem>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<ShipmentItem?> GetById(int shipmentItemId)
        {
            return await _repository.GetById(shipmentItemId);
        }

        public async Task<bool> Insert(ShipmentItem shipmentItem)
        {
            return await _repository.Insert(shipmentItem);
        }

        public async Task<bool> Update(ShipmentItem shipmentItem)
        {
            return await _repository.Update(shipmentItem);
        }

        public async Task<bool> Delete(int shipmentItemId)
        {
            return await _repository.Delete(shipmentItemId);
        }
    }
}
