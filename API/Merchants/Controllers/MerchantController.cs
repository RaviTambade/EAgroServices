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

        [HttpGet("{merchantId}/getcorporate")]
         public async Task<int> GetCorporateId(int merchantId)
        {
            return await _srv.GetCorporateId(merchantId);
        }

         [HttpGet("manager/{managerId}")]
         public async Task<int> GetMerchantId(int managerId)
        {
            return await _srv.GetMerchantId(managerId);
        }
        [HttpGet("id/{corporateId}")]
          public async Task<int> GetId(int corporateId)
        {
            return await _srv.GetId(corporateId);
        }
    }
}
