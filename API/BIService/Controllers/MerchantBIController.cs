using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/merchantbi")]
public class MerchantBIController : ControllerBase
{
    private readonly IMerchantService _srv;

    public MerchantBIController(IMerchantService srv)
    {
        _srv = srv;
    }

    [HttpGet("count/month/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId, int year)
    {
        return await _srv.GetCollectionCountByMonth(merchantId, year);
    }
    [HttpGet("count/year/{merchantId:int}")]
    public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId)
    {
        return await _srv.GetCollectionCountByYear(merchantId);
    }
    [HttpGet("count/quarter/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantId, int year)
    {
        return await _srv.GetCollectionCountByQuarter(merchantId, year);
    }
    [HttpGet("count/week/{merchantId:int}/{year:int}")]
    public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantId, int year)
    {
        return await _srv.GetCollectionCountByWeek(merchantId, year);
    }
}

