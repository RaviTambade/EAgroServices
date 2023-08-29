using Transflower.EAgroServices.Shipments.Services.Interfaces;
using Transflower.EAgroServices.Shipments.Repositories.Interfaces;
using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Extensions;
using Transflower.EAgroServices.Shipments.Entities;

namespace Transflower.EAgroServices.Shipments.Services;

public class ShipmentService : IShipmentService
{
    private readonly IShipmentRepository _repository;

    public ShipmentService(IShipmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Shipment>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<Shipment?> GetById(int shipmentId)
    {
        return await _repository.GetById(shipmentId);
    }

    public async Task<List<InprogressShipment>> GetInprogressShipments()
    {
        return await _repository.GetInprogressShipments();
    }

    public async Task<PagedList<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus,
        FilterRequest request,
        int pageNumber
    )
    {
        return await _repository.GetShippedCollections(
            collectionCenterId,
            shipmentStatus,
            request,
            pageNumber
        );
    }

    public async Task<List<ShipmentItemDetail>> GetShipmentItemsById(int shipmentId)
    {
        return await _repository.GetShipmentItemsById(shipmentId);
    }

    public async Task<TransporterAmount?> GetTransporterAmountByShipmentId(int shipmentId)
    {
        return await _repository.GetTransporterAmountByShipmentId(shipmentId);
    }

    public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
    {
        return await _repository.IsShipmentStatusDelivered(shipmentId);
    }

    public async Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject)
    {
        return await _repository.UpdateStatus(shipmentId, statusObject);
    }

    public async Task<bool> Insert(Shipment shipment)
    {
        return await _repository.Insert(shipment);
    }

    public async Task<bool> Update(Shipment shipment)
    {
        return await _repository.Update(shipment);
    }

    public async Task<bool> Delete(int shipmentId)
    {
        return await _repository.Delete(shipmentId);
    }

    public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
    {
        return await _repository.GetShipmentByVehicleId(vehicleId);
    }

    public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId)
    {
        return await _repository.GetShipmentofTransporter(transporterId);
    }

    public async Task<List<MerchantShipment>?> GetInprogressShipmentsByMerchant(int merchantId)
    {
        return await _repository.GetInprogressShipmentsByMerchant(merchantId);
    }

    public async Task<List<MerchantShipment>?> GetDeliveredShipmentsByMerchant(
        int merchantId,
        string paymentStatus
    )
    {
        return await _repository.GetDeliveredShipmentsByMerchant(merchantId, paymentStatus);
    }
}
