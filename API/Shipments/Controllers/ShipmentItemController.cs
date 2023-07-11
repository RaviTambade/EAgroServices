using Shipments.Models;
using Shipments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Shipments.Controllers
{
    [ApiController]
    [Route("/api/shipmentitems")]
    public class ShipmentItemController : ControllerBase
    {
        private readonly IShipmentItemService _srv;

        public ShipmentItemController(IShipmentItemService srv)
        {
            _srv = srv;
        }

        [HttpGet]
        public async Task<List<ShipmentItem>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("{shipmentItemId}")]
        public async Task<ShipmentItem> GetById(int shipmentItemId)
        {
            return await _srv.GetById(shipmentItemId);
        }
        

        [HttpPost]
        public async Task<bool> Insert(ShipmentItem shipmentItem)
        {
            return await _srv.Insert(shipmentItem);
        }

        [HttpPut]
        public async Task<bool> Update(ShipmentItem shipmentItem)
        {
            return await _srv.Update(shipmentItem);
        }

        [HttpDelete("{shipmentItemId}")]
        public async Task<bool> Delete(int shipmentItemId)
        {
            return await _srv.Delete(shipmentItemId);
        }
    }
}
