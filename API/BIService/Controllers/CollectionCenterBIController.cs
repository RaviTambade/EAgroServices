using BIService.Models;
using BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BIService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CollectionCenterBIController : ControllerBase
    {
        private readonly ICollectionCenterService _srv;

        public CollectionCenterBIController(ICollectionCenterService srv)
        {
            _srv = srv;
        }

        [HttpGet("revenue/year/{collectionCenterId:int}")]
        public async Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId)
        {
            return await _srv.GetRevenuesByYear(collectionCenterId);
        }

        [HttpGet("revenue/quarter/{collectionCenterId:int}/{year:int}")]
        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(
            int collectionCenterId,
            int year
        )
        {
            return await _srv.GetRevenuesByQuarter(collectionCenterId, year);
        }

        [HttpGet("revenue/month/{collectionCenterId:int}/{year:int}")]
        public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
        {
            return await _srv.GetRevenuesByMonth(collectionCenterId, year);
        }

        [HttpGet("revenue/week/{collectionCenterId:int}/{year:int}")]
        public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
        {
            return await _srv.GetRevenuesByWeek(collectionCenterId, year);
        }

        //   [HttpGet("ordercount/{collectionCenterId}")]
        // public async Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId)
        // {
        //     return await _srv.GetMonthOrders(collectionCenterId);
        // }

        // [HttpGet("revenue/crop/{collectionCenterId}")]
        // public async Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId)
        // {
        //     return await _srv.GetCropRevenues(collectionCenterId);
        // }
    }
}
