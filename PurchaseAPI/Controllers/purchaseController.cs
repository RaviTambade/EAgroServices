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

    [HttpGet("getfarmerpurchasedetails/{id}")]
    public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int id)
    {
        return await _service.GetFarmerPurchaseDetails(id);
    }


    [HttpGet("getpurchasedetailsbyvariety/{id}")]
    public async Task<List<PurchaseViewModel>> GetPurchaseDetailsByVariety(int id)
    {
        return await _service.GetPurchaseByVariety(id);
    }

    [HttpPost("getpurchasebygrade")]
    public async Task<List<PurchaseViewModel>> GetPurchaseByGrade([FromBody] Grade grade)
    {
        return await _service.GetPurchaseByGrade(grade.GradeName);
    }

    [HttpPost("getpurchasebyvarietyandgrade/{id}")]
    public async Task<List<PurchaseViewModel>> GetPurchaseByVarietyAndGrade(int id, Grade grade)
    {
        return await _service.GetPurchaseByVarietyAndGrade(id, grade.GradeName);
    }

    [HttpGet("getfarmerselltotalamountbymonth/{id}")]
    public async Task<List<FarmerSell>> FarmerSellTotalAmountByMonth(int id){
        return await _service.FarmerSellTotalAmountByMonth(id);
    }
    [HttpGet("getfarmerselltotalamount/{id}")]
    public async Task<int> GetFarmerSellTotalAmount(int id){
        return await _service.GetFarmerSellTotalAmount(id);
    }

}