using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class ShipmentItemController : ControllerBase
{
    private readonly IShipmentItemService _shipmentItemService;

    public ShipmentItemController(IShipmentItemService shipmentItemService)
    {
        _shipmentItemService = shipmentItemService;
    }

    [HttpGet]
    public async Task<IEnumerable<ShipmentItem>> GetShipmentItems()
    {
        IEnumerable<ShipmentItem> shipmentItems = await _shipmentItemService.FindAll();
        return shipmentItems;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ShipmentItem> GetShipmentItemById(int id)
    {
        ShipmentItem shipmentItem = await _shipmentItemService.FindById(id);
        return shipmentItem;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(ShipmentItem shipmentItem)
    {
        await _shipmentItemService.Add(shipmentItem);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(ShipmentItem shipmentItem)
    {
        await _shipmentItemService.Update(shipmentItem);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _shipmentItemService.Delete(id);
    }
}
