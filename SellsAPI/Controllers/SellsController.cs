using Microsoft.AspNetCore.Mvc;
using SellsAPI.Models;
using SellsAPI.Services.Interfaces;

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
        [Route("sells")]
        public async Task<List<SellBillingView>> GetAll()
        {
            List<SellBillingView> sellBillingViews = await _srv.GetAll();
            return sellBillingViews;
        }

        [HttpGet]
        [Route("sells/{id}")]
        public async Task<Sell> GetById(int id)
        {
            Sell sell = await _srv.GetById(id);
            return sell;
        }

        [HttpPost]
        public async Task<bool> Insert([FromBody] SellBilling sellBilling)
        {
            Sell? sell = sellBilling.Sell;
            FreightRate? freightRate = sellBilling.FreightRate;
             Console.WriteLine(sell.NetWeight);
            Console.WriteLine(sell.Quantity);
            Console.WriteLine(sell.RatePerKg);
            Console.WriteLine(sell.VehicleId);
            Console.WriteLine(freightRate.Kilometers);
            Console.WriteLine(freightRate.RatePerKm);
            Console.WriteLine(freightRate.ToDestination);
            return await _srv.Insert(sell, freightRate);
           
        }

        [HttpPut]
        [Route("sells/{id}")]
        public async Task<bool> Update(int id, [FromBody] SellBilling sellBilling)
        {
            return await _srv.Update(id, sellBilling.Sell, sellBilling.FreightRate);
        }

        [HttpDelete]
        [Route("sells/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

        [HttpGet]
        [Route("merchantsells/{id}")]
        public async Task<List<MerchantSell>> GetMerchantSellById(int id)
        {
            return await _srv.GetSellByMerchantId(id);
        }

        [HttpGet]
        [Route("vehiclesbilling/{id}")]
        public async Task<List<VehicleBilling>> GetTruckBillingsByTruckId(int id)
        {
            return await _srv.GetTruckBillingsByTruckId(id);
        }

        [HttpGet]
        [Route("merchantrevenue/{id}")]
        public async Task<List<MerchantRevenue>> GetMerchantRevenues(int id)
        {
            return await _srv.GetMerchantRevenues(id);
        }

        // [HttpGet]
        // [Route("totalcollectionamountmerchant/{id}")]
        // public async Task<double> GetTotalPurchaseAmountOfMerchant(int id)
        // {
        //     return await _srv.GetTotalPurchaseAmountOfMerchant(id);
        // }

        [HttpGet]
        [Route("totalcollectionorderscount/{id}")]
        public async Task<List<MerchantOrder>> GetTotalPurchaseOrdersCount(int id)
        {
            return await _srv.GetTotalPurchaseOrdersCount(id);
        }
    }
}
