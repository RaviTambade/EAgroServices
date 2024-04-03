using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Entities;
using Transflower.EAgroServices.Shipments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Transflower.EAgroServices.Shipments.Extensions;

namespace  Transflower.EAgroServices.Shipments.Controllers;

[ApiController]
[Route("/api/shipments")]
public class ShipmentController : ControllerBase
{
    private readonly IShipmentService _service;

    public ShipmentController(IShipmentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Shipment>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("inprogress/merchant/{merchantId}")]
    public async Task<List<MerchantShipment>?> GetInprogressShipmentsByMerchant(int merchantId)
    {
        return await _service.GetInprogressShipmentsByMerchant(merchantId);
    }

    [HttpGet("delivered/merchant/{merchantId}/{paymentStatus}")]
    public async Task<List<MerchantShipment>?> GetDeliveredShipmentsByMerchant(
        int merchantId,
        string paymentStatus
    )
    {
        return await _service.GetDeliveredShipmentsByMerchant(merchantId, paymentStatus);
    }

    [HttpGet("shipmentitems/{shipmentId}")]
    public async Task<List<ShipmentItemDetail>> GetShipmentItemsById(int shipmentId)
    {
        return await _service.GetShipmentItemsById(shipmentId);
    }

    [HttpGet("transporteramount/{shipmentId}")]
    public async Task<TransporterAmount?> GetTransporterAmountByShipmentId(int shipmentId)
    {
        return await _service.GetTransporterAmountByShipmentId(shipmentId);
    }

    [HttpGet("{shipmentId}")]
    public async Task<Shipment?> GetById(int shipmentId)
    {
        return await _service.GetById(shipmentId);
    }

    [HttpGet("status/{shipmentId}")]
    public async Task<bool> IsShipmentStatusDelivered(int shipmentId)
    {
        return await _service.IsShipmentStatusDelivered(shipmentId);
    }

    [HttpGet("vehicles/{vehicleId}")]
    public async Task<List<CorporateShipment>> GetShipmentByVehicleId(int vehicleId)
    {
        return await _service.GetShipmentByVehicleId(vehicleId);
    }

    [HttpGet("inprogress")]
    public async Task<List<InprogressShipment>> GetInprogressShipments()
    {
        return await _service.GetInprogressShipments();
    }

    [HttpPatch("status/{shipmentId}")]
    public async Task<bool> UpdateStatus(int shipmentId, [FromBody] UpdateStatus statusObject)
    {
        return await _service.UpdateStatus(shipmentId, statusObject);
    }

    [HttpPost]
    public async Task<bool> Insert(Shipment shipment)
    {
        return await _service.Insert(shipment);
    }

    [HttpPut]
    public async Task<bool> Update(Shipment shipment)
    {
        return await _service.Update(shipment);
    }

    [HttpDelete("{shipmentId}")]
    public async Task<bool> Delete(int shipmentId)
    {
        return await _service.Delete(shipmentId);
    }

    [HttpGet("transporter/{transporterId}")]
    public async Task<List<VehicleCorporateShipment>> GetShipmentofTransporter(int transporterId)
    {
        return await _service.GetShipmentofTransporter(transporterId);
    }

    [HttpPost("collections/{collectionCenterId}/status/{shipmentStatus}")]
    public async Task<List<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus,
        [FromBody] FilterRequest request,
        [FromQuery] int pageNumber
    )
    {
        var shippedCollections = await _service.GetShippedCollections(
            collectionCenterId,
            shipmentStatus,
            request,
            pageNumber
        );
        Response.AddPaginationHeader(shippedCollections);

        return shippedCollections;
    }


    [HttpGet("{collectionCenterId}/status/{shipmentStatus}")]
        public async Task<List<ShippedCollection>> GetShippedCollections(
        int collectionCenterId,
        string shipmentStatus
    ){
        return await _service.GetShippedCollections(collectionCenterId,shipmentStatus);
    }
}
