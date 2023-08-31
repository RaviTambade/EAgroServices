using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/transporterbi")]
public class TransporterBIController : ControllerBase
{
  private readonly ITransporterService _srv;
  public TransporterBIController(ITransporterService srv)
  {
    _srv = srv;
  }

  [HttpGet("revenue/year/{transporterId:int}/{year:int}")]
  public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year)
  {
    return await _srv.GetRevenuesByYear(transporterId, year);
  }

  [HttpGet("years/{transporterId}")]
  public async Task<List<int>> GetYears(int transporterId)
  {
    return await _srv.GetYears(transporterId);
  }

  [HttpGet("revenue/month/{transporterId:int}/{year:int}")]
  public async Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId, int year)
  {
    return await _srv.GetMonthlyRevenue(transporterId, year);
  }

  [HttpGet("revenue/quarter/{transporterId:int}/{year:int}")]
  public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year)
  {
    return await _srv.GetRevenuesByQuarter(transporterId, year);
  }

  [HttpGet("revenue/week/{transporterId:int}/{year:int}")]
  public async Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId, int year)
  {
    return await _srv.GetRevenuesByWeek(transporterId, year);
  }

  [HttpGet("revenue/year/{transporterId:int}")]
  public async Task<List<YearRevenue>> GetRevenueByYear(int transporterId)
  {
    return await _srv.GetRevenueByYear(transporterId);
  }
}
