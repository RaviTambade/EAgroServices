using Microsoft.AspNetCore.Mvc;
using PurchaseAPI.Models;
using PurchaseAPI.Services.Interfaces;
namespace PurchaseAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class PurchasesController : ControllerBase
{
    private readonly IPurchaseService _service;
    public PurchasesController(IPurchaseService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<PurchaseViewModel>> GetPurchaseItems()
    {
        return await _service.GetAllPurchaseItems();
    }

    [HttpGet("{id}")]
    public async Task<PurchaseViewModel> GetPurchaseItemById(int id)
    {
        return await _service.GetPurchaseItemById(id);
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] PurchaseItem purchaseItem)
    {
        return await _service.Insert(purchaseItem);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, [FromBody] PurchaseItem purchaseItem)
    {
        return await _service.Update(id, purchaseItem);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }

    [HttpGet("farmers/{id}")] // print list of farmer purchase
    public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int id)
    {
        return await _service.GetFarmerPurchaseDetails(id);
    }

    [HttpGet("farmers/{id}/totalamountofmonth")] // column chart
    public async Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int id)
    {
        return await _service.FarmerSellTotalAmountByMonth(id);
    }
    [HttpGet("farmers/{id}/totalamount")]      //totalAmount card
    public async Task<int> GetFarmerSellTotalAmount(int id)
    {
        return await _service.GetFarmerSellTotalAmount(id);
    }

    //http://localhost:8989/api/farmers/{id}/selling/

    //http://localhost:8989/api/farmers/{id}/selling/variety/{varietyid}



    //http://localhost:8989/api/farmer/{id}/variety/
    // [HttpGet("farmers/{id}/selling")]

    [HttpGet("farmers/{id}/variety/")]        // sell data by variety - pie chart
    public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int id)
    {
        return await _service.GetFarmerSellByVariety(id);
    }

    //http://localhost:8989/api/farmer/{id}/orders/

    // [HttpGet("farmers/{id}/orders")]
    [HttpGet("farmers/{id}/orders")]        //counting orders per month - area chart
    public async Task<List<FarmerOrder>> GetFarmerOrdersPerMonth(int id)
    {
        return await _service.GetFarmerOrdersPerMonth(id);
    }

}