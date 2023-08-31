using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/farmer")]
public class FarmerController : ControllerBase
{
    private readonly IFarmerService _srv;

    public FarmerController(IFarmerService srv)
    {
        _srv = srv;
    }

    [HttpGet("revenue/year/{farmerId:int}")]
    public async Task<List<YearRevenue>> GetRevenuesByYear(int farmerId)
    {
        return await _srv.GetRevenuesByYear(farmerId);
    }

    [HttpGet("revenue/quarter/{farmerId:int}/{year:int}")]
    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int farmerId, int year)
    {
        return await _srv.GetRevenuesByQuarter(farmerId, year);
    }
    [HttpGet("revenue/month/{farmerId:int}/{year:int}")]
    public async Task<List<MonthRevenue>> GetRevenuesByMonth(int farmerId, int year)
    {
        return await _srv.GetRevenuesByMonth(farmerId, year);
    }
    [HttpGet("revenue/week/{farmerId:int}/{year:int}")]
    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int farmerId, int year)
    {
        return await _srv.GetRevenuesByWeek(farmerId, year);
    }

}