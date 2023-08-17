using Shipments.Models;
using Shipments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shipments.Extensions;

namespace Shipments.Controllers
{
    [ApiController]
    [Route("/api/shipments")]
    public class ShipmentController : ControllerBase
    {
        private readonly IShipmentService _srv;

        public ShipmentController(IShipmentService srv)
        {
            _srv = srv;
        }

        [HttpGet]
        public async Task<List<Shipment>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("merchant/{merchantId}/status/{status}")]
        public async Task<List<MerchantShipment>?> GetShipmentsByMerchant(
            int merchantId,
            string status
        )
        {
            return await _srv.GetShipmentsByMerchant(merchantId, status);
        }

        [HttpGet("shipmentitems/{shipmentId}")]
        public async Task<List<ShipmentItemDetails>> GetShipmentItemsById(int shipmentId)
        {
            return await _srv.GetShipmentItemsById(shipmentId);
        }

        [HttpGet("transporteramount/{shipmentId}")]
        public async Task<TransporterAmount> GetTransporterAmountByShipmentId(int shipmentId)
        {
            return await _srv.GetTransporterAmountByShipmentId(shipmentId);
        }

        [HttpGet("{shipmentId}")]
        public async Task<Shipment> GetById(int shipmentId)
        {
            return await _srv.GetById(shipmentId);
        }

        [HttpGet("status/{shipmentId}")]
        public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
        {
            return await _srv.IsShipmentStatusDelivered(shipmentId);
        }

        [HttpGet("vehicles/{vehicleId}")]
        public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
        {
            return await _srv.GetShipmentByVehicleId(vehicleId);
        }

        [HttpGet("inprogress")]
        public async Task<List<InprogressShipment>> GetInprogressShipments()
        {
            return await _srv.GetInprogressShipments();
        }

        [HttpPatch("status/{shipmentId}")]
        public async Task<bool> UpdateStatus(int shipmentId, [FromBody] UpdateStatus statusObject)
        {
            return await _srv.UpdateStatus(shipmentId, statusObject);
        }

        [HttpPost]
        public async Task<bool> Insert(Shipment shipment)
        {
            return await _srv.Insert(shipment);
        }

        [HttpPut]
        public async Task<bool> Update(Shipment shipment)
        {
            return await _srv.Update(shipment);
        }

        [HttpDelete("{shipmentId}")]
        public async Task<bool> Delete(int shipmentId)
        {
            return await _srv.Delete(shipmentId);
        }

        [HttpGet("transporter/{transporterId}")]
        public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(
            int transporterId
        )
        {
            return await _srv.GetShipmentofTransporter(transporterId);
        }

        [HttpPost("collections/{collectionCenterId}/status/{shipmentStatus}")]
        public async Task<List<ShippedCollection>> GetShippedCollections(
            int collectionCenterId,
            string shipmentStatus,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var shippedCollections = await _srv.GetShippedCollections(
                collectionCenterId,
                shipmentStatus,
                request,
                pageNumber
            );
            Response.AddPaginationHeader(shippedCollections);

            return shippedCollections;
        }

        [HttpGet("{merchantId}/collectioncount")]
        public async Task<List<CollectionCount>> GetCollectionCounts(int merchantId)
        {
            return await _srv.GetCollectionCounts(merchantId);
        }

        [HttpGet("{merchantId}/cropcount")]
        public async Task<List<CropCount>> GetCropCounts(int merchantId)
        {
            return await _srv.GetCropCounts(merchantId);
        }
    }
}
