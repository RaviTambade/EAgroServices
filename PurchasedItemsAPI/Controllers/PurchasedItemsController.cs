using PurchasedItemsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using PurchasedItemsAPI.Services.Interfaces;
using MySql.Data.MySqlClient.Replication;

namespace PurchasedItemsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class PurchasedItemsController : ControllerBase
{
    private readonly IPurchasedItemService _service;
    public PurchasedItemsController(IPurchasedItemService service)
    {
        this._service = service;
    }

    [HttpGet]
    [Route("purchaseditems")]
    public async Task<List<PurchasedItem>> GetAllPurchasedItems()
    {
      return await _service.GetAllPurchasedItems();
    }

    [HttpGet]
    [Route("getdetails/{id}")]
    public async Task<PurchasedItem> GetPurchasedItem(int id){
        return await _service.GetPurchasedItem(id);
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(PurchasedItem purchasedItem){
        return await _service.Insert(purchasedItem);
    }

    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id,PurchasedItem purchasedItem){
        return await _service.Update(id,purchasedItem);
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id){
        return await _service.Delete(id);
    }
}


