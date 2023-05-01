using Microsoft.AspNetCore.Mvc;
using PurchaseAPI.Models;
using PurchaseAPI.Services.Interfaces;

namespace PurchaseAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class PurchaseController : ControllerBase
{
    private readonly IPurchaseService _service;
    public PurchaseController(IPurchaseService service)
    {
        _service = service;
    }

    [HttpGet("getallpurchaseitems")]
    public async Task<List<PurchaseViewModel>> GetPurchaseItems()
    {
        return await _service.GetAllPurchaseItems();
    }

    [HttpGet("GetById/{id}")]
    public async Task<PurchaseViewModel> GetPurchaseItemById(int id)
    {
        return await _service.GetPurchaseItemById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] PurchaseItem purchaseItem)
    {
        return await _service.Insert(purchaseItem);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] PurchaseItem purchaseItem)
    {
        return await _service.Update(id, purchaseItem);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}
