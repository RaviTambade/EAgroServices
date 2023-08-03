using Shipments.Services.Interfaces;
using Shipments.Repositories.Interfaces;
using Shipments.Models;

namespace Shipments.Services;

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

    public async Task<List<MerchantShipment>?> GetShipmentsByMerchant(int merchantId, string status)
    {
        return await _repo.GetShipmentsByMerchant(merchantId, status);
    }

    public async Task<List<InprogressShipment>> GetInprogressShipments()
    {
        return await _repo.GetInprogressShipments();
    }

    public async Task<List<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus
    )
    {
        return await _repo.GetShippedCollections(collectionCenterId, shipmentStatus);
    }

    public async Task<List<ShipmentItemDetails>> GetShipmentItemsById(int shipmentId)
    {
        return await _repo.GetShipmentItemsById(shipmentId);
    }

    public async Task<TransporterAmount> GetTransporterAmountByShipmentId(int shipmentId)
    {
        return await _repo.GetTransporterAmountByShipmentId(shipmentId);
    }

    public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
    {
        return await _repo.IsShipmentStatusDelivered(shipmentId);
    }

    public async Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject)
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

    public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
    {
        return await _repo.GetShipmentByVehicleId(vehicleId);
    }

    public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId)
    {
        return await _repo.GetShipmentofTransporter(transporterId);
    }

    public async Task<List<CollectionCount>> GetCollectionCounts(int merchantId)
    {
        return await _repo.GetCollectionCounts(merchantId);
    }
}
