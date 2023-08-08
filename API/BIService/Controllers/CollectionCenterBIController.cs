
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

          [HttpGet("revenue/month/{collectionCenterId}")]
        public async Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId)
        {
            return await _srv.GetMonthRevenues(collectionCenterId);
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