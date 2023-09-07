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

    [HttpGet("count/month/{merchantId:int}/{year:int}/{monthName}")]
    public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId, int year,string monthName)
    {
        return await _service.GetCollectionCountByMonth(merchantId, year,monthName);
    }
    [HttpGet("count/year/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId,int year)
    {
        return await _service.GetCollectionCountByYear(merchantId,year);
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
    
    [HttpGet("year/{merchantId:int}")]

    public async Task<List<int>> GetYears(int merchantId)
    {
        return await _service.GetYear(merchantId);
    }
}

