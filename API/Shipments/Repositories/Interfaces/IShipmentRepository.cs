using Transflower.EAgroServices.Shipments.Extensions;
using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Entities;

namespace Transflower.EAgroServices.Shipments.Repositories.Interfaces;

public interface IShipmentRepository
{
    Task<List<Shipment>> GetAll();
    Task<Shipment?> GetById(int shipmentId);
    Task<List<MerchantShipment>?> GetInprogressShipmentsByMerchant(int merchantId);
    Task<List<MerchantShipment>?> GetDeliveredShipmentsByMerchant(
        int merchantId,
        string paymentStatus
    );
    Task<List<ShipmentItemDetail>> GetShipmentItemsById(int shipmentId);
    Task<List<InprogressShipment>> GetInprogressShipments();

    Task<PagedList<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus,
        FilterRequest request,
        int pageNumber
    );

     Task<List<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus);
    Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId);
    Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId);
    Task<TransporterAmount?> GetTransporterAmountByShipmentId(int shipmentId);
    Task<bool> IsShipmentStatusDelivered(int shipmentId);
    Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject);
    Task<bool> Insert(Shipment shipment);
    Task<bool> Update(Shipment shipment);
    Task<bool> Delete(int shipmentId);
}
