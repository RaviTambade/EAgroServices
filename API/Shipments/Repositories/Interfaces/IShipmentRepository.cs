using System.Security.Cryptography;
using Shipments.Extensions;
using Shipments.Models;

namespace Shipments.Repositories.Interfaces
{
    public interface IShipmentRepository
    {
        Task<List<Shipment>> GetAll();
        Task<Shipment> GetById(int shipmentId);
        Task<List<MerchantShipment>?> GetInprogressShipmentsByMerchant(int merchantId);
        Task<List<MerchantShipment>?> GetDeliveredShipmentsByMerchant(
            int merchantId,
            string paymentStatus
        );
        Task<List<ShipmentItemDetails>> GetShipmentItemsById(int shipmentId);
        Task<List<InprogressShipment>> GetInprogressShipments();

        Task<PagedList<ShippedCollection>> GetShippedCollections(
            int collectionCenterId,
            string shipmentStatus,
            FilterRequest request,
            int pageNumber
        );

        Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId);
        Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId);
        Task<TransporterAmount> GetTransporterAmountByShipmentId(int shipmentId);
        Task<List<CollectionCount>> GetCollectionCounts(int merchantId);
        Task<List<CropCount>> GetCropCounts(int merchantId);
        Task<bool> IsShipmentStatusDelivered(int shipmentId);
        Task<bool> UpdateStatus(int shipmentId, UpdateStatus statusObject);
        Task<bool> Insert(Shipment shipment);
        Task<bool> Update(Shipment shipment);
        Task<bool> Delete(int shipmentId);
    }
}
