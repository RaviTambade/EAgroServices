
using RateCards.Models;
using RateCards.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace RateCards.Controllers
{
    [ApiController]
    [Route("/api/RateCard")]
    public class RateCardController : ControllerBase
    {
        private readonly IRateCardService _srv;

        public RateCardController(IRateCardService srv)
        {
            _srv = srv;
        }
    [HttpGet]
      public async Task<List<RateCard>> GetAll(){
        return await _srv.GetAll();
      }

      [HttpGet]
      [Route("{id}")]
      public async Task<RateCard> GetById(int id){
        return await _srv.GetById(id);
      }
      [HttpPost]
      [Route("Add")]
      public async Task<bool> Insert(RateCard ratecard){
        return await _srv.Insert(ratecard);
      }
      [HttpPut]
      [Route("{id}")]
      public async Task<bool> Update(int id,RateCard ratecard){
        return await _srv.Update(id,ratecard);
       }

      [HttpDelete]
      [Route("{id}/remove")]
      public async Task<bool> Delete(int id){
        return await _srv.Delete(id);
      }

    }
}