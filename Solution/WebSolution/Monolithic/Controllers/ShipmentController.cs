using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class ShipmentController : ControllerBase
{
    private readonly IShipmentService _shipmentService;

    public ShipmentController(IShipmentService shipmentService)
    {
        _shipmentService = shipmentService;
    }

    [HttpGet]
    public async Task<IEnumerable<Shipment>> GetShipments()
    {
        IEnumerable<Shipment> shipments = await _shipmentService.FindAll();
        return shipments;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Shipment> GetShipmentById(int id)
    {
        Shipment shipment = await _shipmentService.FindById(id);
        return shipment;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(Shipment shipment)
    {
        await _shipmentService.Add(shipment);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(Shipment shipment)
    {
        await _shipmentService.Update(shipment);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _shipmentService.Delete(id);
    }
}
