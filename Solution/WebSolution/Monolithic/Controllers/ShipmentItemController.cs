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
    public async Task<IActionResult> GetShipmentItems()
    {
        try
        {
            IEnumerable<ShipmentItem> shipmentItems = await _shipmentItemService.FindAll();
            if (shipmentItems == null)
            {
                return NoContent();
            }
            return Ok(shipmentItems);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetShipmentItemById(int id)
    {
        try
        {
            ShipmentItem shipmentItem = await _shipmentItemService.FindById(id);
            if (shipmentItem == null)
            {
                return NoContent();
            }
            return Ok(shipmentItem);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(ShipmentItem shipmentItem)
    {
        try
        {
            await _shipmentItemService.Add(shipmentItem);
            return CreatedAtAction(
                nameof(GetShipmentItemById),
                new { id = shipmentItem.Id },
                shipmentItem
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(ShipmentItem shipmentItem)
    {
        try
        {
            await _shipmentItemService.Update(shipmentItem);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _shipmentItemService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
