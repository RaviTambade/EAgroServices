using BIService.Models;
using BIService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BIService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MerchantBIController : ControllerBase
    {
        private readonly IMerchantService _srv;

        public MerchantBIController(IMerchantService srv)
        {
            _srv = srv;
        }

        [HttpGet("count/month/{merchantId:int}/{year:int}")]
        public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId,int year)
        {
            return await _srv.GetCollectionCountByMonth(merchantId,year);
        }
    }
}
