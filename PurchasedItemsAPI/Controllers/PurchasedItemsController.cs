using PurchasedItemsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using PurchasedItemsAPI.Services.Interfaces;

namespace PurchasedItemsAPI.Controller;

[ApiController]
public class PurchasedItemstController : ControllerBase
{

    private readonly IPurchasedItemService _service;

    public PurchasedItemstController(IPurchasedItemService service)
    {

        this._service = service;
    }

    [HttpGet("/api/purchaseditems")]

    public IActionResult GetAllPurchasedItems()
    {

        try
        {
            var data = _service.GetAllPurchasedItems();
            if (data == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(data);
            }

        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }


}


