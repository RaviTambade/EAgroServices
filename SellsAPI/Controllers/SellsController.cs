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
        public async Task<List<Sell>> GetAll()
        {
            List<Sell> sells = await _srv.GetAll();
            return sells;
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
        public async Task<bool> Insert([FromBody] Sell sell)
        {

            return await _srv.Insert(sell);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<bool> Update(int id, [FromBody] Sell sell)
        { 
             return await _srv.Update(id, sell);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

    }
}




