using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/transporterbi")]
public class TransporterBIController : ControllerBase
{
  private readonly ITransporterService _service;
  public TransporterBIController(ITransporterService service)
  {
    _service = service;
  }

  [HttpGet("revenue/year/{transporterId:int}/{year:int}")]
  public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year)
  {
    return await _service.GetRevenuesByYear(transporterId, year);
  }

  [HttpGet("years/{transporterId}")]
  public async Task<List<int>> GetYears(int transporterId)
  {
    return await _service.GetYears(transporterId);
  }

  [HttpGet("revenue/month/{transporterId:int}/{year:int}")]
  public async Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId, int year)
  {
    return await _service.GetMonthlyRevenue(transporterId, year);
  }

  [HttpGet("revenue/quarter/{transporterId:int}/{year:int}")]
  public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year)
  {
    return await _service.GetRevenuesByQuarter(transporterId, year);
  }

  [HttpGet("revenue/week/{transporterId:int}/{year:int}")]
  public async Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId, int year)
  {
    return await _service.GetRevenuesByWeek(transporterId, year);
  }

  [HttpGet("revenue/year/{transporterId:int}")]
  public async Task<List<YearRevenue>> GetRevenueByYear(int transporterId)
  {
    return await _service.GetRevenueByYear(transporterId);
  }
}
