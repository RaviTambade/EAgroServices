using System.Globalization;
using BIService.Models;
using BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BIService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
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
        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int farmerId,int year)
        {
            return await _srv.GetRevenuesByQuarter(farmerId, year);
        }


        }
        }