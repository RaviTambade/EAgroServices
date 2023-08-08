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

        [HttpGet("revenue/{collectionCenterId}/{forYear}")]
        public async Task<List<object>> GetRevenuesByType(
            int collectionCenterId,
            int forYear,
            [FromQuery] RevenueType revenueType
        )
        {
            var revenues = await _srv.GetRevenuesByType(collectionCenterId, revenueType, forYear);
            List<object> specificRevenues = new List<object>();

            if (revenues.Any())
            {
                var firstRevenue = revenues.First();

                if (firstRevenue is YearRevenue)
                {
                    specificRevenues.AddRange(revenues.OfType<YearRevenue>().ToList());
                }
                else if (firstRevenue is QuarterRevenue)
                {
                    specificRevenues.AddRange(revenues.OfType<QuarterRevenue>().ToList());
                }
                else if (firstRevenue is MonthRevenue)
                {
                    specificRevenues.AddRange(revenues.OfType<MonthRevenue>().ToList());
                }
                else if (firstRevenue is WeekRevenue)
                {
                    specificRevenues.AddRange(revenues.OfType<WeekRevenue>().ToList());
                }
            }
            return specificRevenues;
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
