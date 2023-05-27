using Microsoft.AspNetCore.Mvc;
using PurchasingAPI.Models;
using PurchasingAPI.Services.Interfaces;
namespace PurchasingAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class PurchasingController : ControllerBase
{
    private readonly IPurchaseService _service;
    public PurchasingController(IPurchaseService service)
    {
        _service = service;
    }
    [HttpGet("farmers/{farmerid}/variety/{varietyid}")]        // sell data by variety - pie chart
    public async Task<List<FarmerSellVariety>> GetFarmerSellByVariety(int farmerId,int varietyId)
    {
        return await _service.GetFarmerSellByVariety(farmerId,varietyId);
    }
}