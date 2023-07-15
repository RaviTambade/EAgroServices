using Shipments.Services.Interfaces;
using Shipments.Repositories.Interfaces;
using Shipments.Models;

namespace Shipments.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repo;

        public ShipmentService(IShipmentRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Shipment>> GetAll()
        {
            return await _repo.GetAll();
        }

        public async Task<Shipment> GetById(int shipmentId)
        {
            return await _repo.GetById(shipmentId);
        }

        public async Task<List<MerchantShipment>> GetShipmentsByMerchant(int merchantId,string status)
        {
            return await _repo.GetShipmentsByMerchant(merchantId,status);
        }

        public async Task<List<ShipmentItemDetails>> GetShipmentItemsById(int shipmentId)
        {
            return await _repo.GetShipmentItemsById(shipmentId);
        }

        public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
        {
            return await _repo.IsShipmentStatusDelivered(shipmentId);
        }

        public async Task<bool> UpdateStatus(int shipmentId,UpdateStatus statusObject)
        {
            return await _repo.UpdateStatus(shipmentId, statusObject);
        }

        public async Task<bool> Insert(Shipment shipment)
        {
            return await _repo.Insert(shipment);
        }

        public async Task<bool> Update(Shipment shipment)
        {
            return await _repo.Update(shipment);
        }

        public async Task<bool> Delete(int shipmentId)
        {
            return await _repo.Delete(shipmentId);
        }

        public async Task<List<Shipment>> GetShipmentByVehicleId(int vehicleId)
        {
            return await _repo.GetShipmentByVehicleId(vehicleId);
        }
    }
}
