using Transflower.EAgroServices.Shipments.Entities;
using Transflower.EAgroServices.Shipments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Shipments.Controllers;

[ApiController]
[Route("/api/shipmentitems")]
public class ShipmentItemController : ControllerBase
{
    private readonly IShipmentItemService _service;

    public ShipmentItemController(IShipmentItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<ShipmentItem>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{shipmentItemId}")]
    public async Task<ShipmentItem?> GetById(int shipmentItemId)
    {
        return await _service.GetById(shipmentItemId);
    }

    [HttpPost]
    public async Task<bool> Insert(ShipmentItem shipmentItem)
    {
        return await _service.Insert(shipmentItem);
    }

    [HttpPut]
    public async Task<bool> Update(ShipmentItem shipmentItem)
    {
        return await _service.Update(shipmentItem);
    }

    [HttpDelete("{shipmentItemId}")]
    public async Task<bool> Delete(int shipmentItemId)
    {
        return await _service.Delete(shipmentItemId);
    }
}
