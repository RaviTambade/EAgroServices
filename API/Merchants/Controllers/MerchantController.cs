using Merchants.Models;
using Merchants.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Merchants.Controllers
{
    [ApiController]
    [Route("/api/merchants")]
    public class MerchantController : ControllerBase
    {
        private readonly IMerchantService _srv;

        public MerchantController(IMerchantService srv)
        {
            _srv = srv;
        }

        [HttpGet]
        public async Task<List<Merchant>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("{merchantId}")]
        public async Task<Merchant> GetById(int merchantId)
        {
            return await _srv.GetById(merchantId);
        }

        [HttpPost]
        public async Task<bool> Insert(Merchant merchant)
        {
            return await _srv.Insert(merchant);
        }

        [HttpPut]
        public async Task<bool> Update(Merchant merchant)
        {
            return await _srv.Update(merchant);
        }

        [HttpDelete("{merchantId}")]
        public async Task<bool> Delete(int merchantId)
        {
            return await _srv.Delete(merchantId);
        }
    }
}
