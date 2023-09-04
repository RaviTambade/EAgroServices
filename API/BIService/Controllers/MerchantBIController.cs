using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/merchantbi")]
public class MerchantBIController : ControllerBase
{
    private readonly IMerchantService _service;

    public MerchantBIController(IMerchantService service)
    {
        _service = service;
    }

    [HttpGet("count/month/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId, int year)
    {
        return await _service.GetCollectionCountByMonth(merchantId, year);
    }
    [HttpGet("count/year/{merchantId:int}")]
    public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId)
    {
        return await _service.GetCollectionCountByYear(merchantId);
    }
    [HttpGet("count/quarter/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantId, int year)
    {
        return await _service.GetCollectionCountByQuarter(merchantId, year);
    }
    [HttpGet("count/week/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantId, int year)
    {
        return await _service.GetCollectionCountByWeek(merchantId, year);
    }
}

