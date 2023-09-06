using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.BIService.Controllers;
[ApiController]
[Route("/api/collectioncenterbi")]
public class CollectionCenterBIController : ControllerBase
{
    private readonly ICollectionCenterService _service;

    public CollectionCenterBIController(ICollectionCenterService service)
    {
        _service = service;
    }

    [HttpGet("revenue/year/{collectionCenterId:int}")]
    public async Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId)
    {
        return await _service.GetRevenuesByYear(collectionCenterId);
    }

    [HttpGet("revenue/quarter/{collectionCenterId:int}/{year:int}")]
    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId, int year)
    {
        return await _service.GetRevenuesByQuarter(collectionCenterId, year);
    }

    [HttpGet("revenue/month/{collectionCenterId:int}/{year:int}")]
    public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
    {
        return await _service.GetRevenuesByMonth(collectionCenterId, year);
    }

    [HttpGet("revenue/week/{collectionCenterId:int}/{year:int}")]
    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
    {
        return await _service.GetRevenuesByWeek(collectionCenterId, year);
    }

    [HttpGet("revenue/crop/month/{collectionCenterId:int}/{year:int}/{monthName}")]
    public async Task<List<CropRevenue>> GetCropRevenuesByMonth(
        int collectionCenterId,
        int year,
        string monthName
    )
    {
        return await _service.GetCropRevenuesByMonth(collectionCenterId, year, monthName);
    }

    [HttpGet("revenue/crop/quarter/{collectionCenterId:int}/{year:int}/{quarterNumber:int}")]
    public async Task<List<CropRevenue>> GetCropRevenuesByQuarter(
        int collectionCenterId,
        int year,
        int quarterNumber
    )
    {
        return await _service.GetCropRevenuesByQuarter(collectionCenterId, year, quarterNumber);
    }

    [HttpGet("revenue/crop/year/{collectionCenterId:int}/{year:int}")]
    public async Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year)
    {
        return await _service.GetCropRevenuesByYear(collectionCenterId, year);
    }

    [HttpGet("revenue/crop/dates/{collectionCenterId:int}/{startDate}/{endDate}")]
    public async Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
        int collectionCenterId,
        string startDate,
        string endDate
    )
    {
        return await _service.GetCropRevenuesBetweenDates(collectionCenterId, startDate, endDate);
    }

    [HttpGet("revenue/crop/years/{collectionCenterId:int}")]
    public async Task<List<int>> GetYearsForCropRevenues(int collectionCenterId)
    {
        return await _service.GetYearsForCropRevenues(collectionCenterId);
    }
}
