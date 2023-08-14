using BIService.Models;
using BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace BIService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
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

        [HttpGet("years")]
        public async Task<List<int>> GetYears()
        {
            return await _srv.GetYears();
        }
    }
}