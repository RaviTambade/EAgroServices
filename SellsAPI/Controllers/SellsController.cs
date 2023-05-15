using SellsAPI.Models;
using SellsAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace SellsAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SellsController : ControllerBase
    {
        private readonly ISellService _srv;
        public SellsController(ISellService srv)
        {
            this._srv = srv;
        }
        [HttpGet]
        [Route("getallsells")]
        public async Task<List<SellBillingView>> GetAll()
        {
            List<SellBillingView> sellBillingViews = await _srv.GetAll();
            return sellBillingViews;
        }

        [HttpGet]
        [Route("getdetails/{id}")]
        public async Task<Sell> GetById(int id)
        {
            Sell sell = await _srv.GetById(id);
            return sell;
        }

        [HttpPost]
        [Route("insert")]
        public async Task<bool> Insert([FromBody] SellBilling sellBilling)
        {
            Sell sell=sellBilling.Sell;
            FreightRate freightRate=sellBilling.FreightRate;
            return await _srv.Insert(sell,freightRate);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<bool> Update(int id, [FromBody] SellBilling sellBilling)
        { 
             return await _srv.Update(id, sellBilling.Sell,sellBilling.FreightRate);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

        [HttpGet]
        [Route("getsellbilling/{id}")]
        public async Task<SellBilling> GetSellBilling(int id){
            return await _srv.GetSellBilling(id);
        }

         [HttpGet]
        [Route("getmerchantsells/{id}")]
        public async Task<List<MerchantSell>> GetMerchantSellById(int id){
            return await _srv.GetSellByMerchantId(id);
        }

        [HttpGet]
        [Route("gettruckbilling/{id}")]
        public async Task<List<TruckBilling>> GetTruckBillingsByTruckId(int id){
            return await _srv.GetTruckBillingsByTruckId(id);
        }

        [HttpGet]
        [Route("getmerchantrevenue/{id}")]
        public async Task<List<MerchantRevenue>> GetMerchantRevenues(int id){
            return await  _srv.GetMerchantRevenues(id);
        }
    }
}




