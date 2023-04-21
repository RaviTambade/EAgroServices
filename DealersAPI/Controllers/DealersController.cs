using DealersAPI.Models;
using DealersAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace DealersAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DealersController : ControllerBase
    {
        private readonly IDealerService _srv;
        public DealersController(IDealerService srv)
        {
            this._srv = srv;
        }
        [HttpGet]
        [Route("getalldealers")]
        public async Task<List<Dealer>> GetDealers()
        {
            return await _srv.GetDealers();
        }

        [HttpGet]
        [Route("getdetails/{id}")]
        public async Task<Dealer> GetDealer(int id)
        {
           return await _srv.GetDealer(id);
        }

        [HttpPost]
        [Route("insert")]
        public async Task<bool> Insert([FromBody] Dealer dealer)
        {
            return await _srv.Insert(dealer);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<bool> Update(int id, [FromBody] Dealer dealer)
        {
            return await _srv.Update(id, dealer);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

    }
}




