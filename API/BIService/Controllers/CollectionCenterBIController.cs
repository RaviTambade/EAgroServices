using System.Globalization;
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
        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId,int year)
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

        [HttpGet("revenue/crop/month/{collectionCenterId:int}/{year:int}/{monthName}")]
        public async Task<List<CropRevenue>> GetCropRevenuesByMonth(
            int collectionCenterId,
            int year,
            string monthName
        )
        {
            return await _srv.GetCropRevenuesByMonth(collectionCenterId, year, monthName);
        }

        [HttpGet("revenue/crop/quarter/{collectionCenterId:int}/{year:int}/{quarterNumber:int}")]
        public async Task<List<CropRevenue>> GetCropRevenuesByQuarter(
            int collectionCenterId,
            int year,
            int quarterNumber
        )
        {
            return await _srv.GetCropRevenuesByQuarter(collectionCenterId, year, quarterNumber);
        }

        [HttpGet("revenue/crop/year/{collectionCenterId:int}/{year:int}")]
        public async Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year)
        {
            return await _srv.GetCropRevenuesByYear(collectionCenterId, year);
        }

        [HttpGet("revenue/crop/dates/{collectionCenterId:int}/{startDate}/{endDate}")]
        public async Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
            int collectionCenterId,
            string startDate,
            string endDate
        )
        {
            return await _srv.GetCropRevenuesBetweenDates(collectionCenterId, startDate, endDate);
        }

        [HttpGet("revenue/crop/years/{collectionCenterId:int}")]
        public async Task<List<int>> GetYearsForCropRevenues(int collectionCenterId)
        {
            return await _srv.GetYearsForCropRevenues(collectionCenterId);
        }


    }
}
