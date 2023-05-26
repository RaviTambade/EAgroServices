using Microsoft.AspNetCore.Mvc;
using PurchasingAPI.Models;
using PurchasingAPI.Services.Interfaces;
namespace PurchasingAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class PurchasesController : ControllerBase
{
    private readonly IPurchaseService _service;
    public PurchasesController(IPurchaseService service)
    {
        _service = service;
    }

    // [HttpGet("{id}/list")] // print list of farmer purchase
    // public async Task<List<PurchaseViewModel>> GetFarmerPurchaseDetails(int id)
    // {
    //     return await _service.GetFarmerPurchaseDetails(id);
    // }

    // [HttpGet("{id}/sellamount")] // column chart
    // public async Task<List<FarmerSellMonth>> FarmerSellTotalAmountByMonth(int id)
    // {
    //     return await _service.FarmerSellTotalAmountByMonth(id);
    // }
    // [HttpGet("farmers/{id}/sellamount")]      //totalAmount card
    // public async Task<int> GetFarmerSellTotalAmount(int id)
    // {
    //     return await _service.GetFarmerSellTotalAmount(id);
    // }

    [HttpGet("farmers/{farmerid}/variety/{varietyid}")]        // sell data by variety - pie chart
    public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId,int varietyId)
    {
        return await _service.GetFarmerSellByVariety(farmerId,varietyId);
    }

    // [HttpGet("farmers/{id}/orders")]        //counting orders per month - area chart
    // public async Task<List<FarmerOrder>> GetFarmerOrdersPerMonth(int id)
    // {
    //     return await _service.GetFarmerOrdersPerMonth(id);
    // }
}