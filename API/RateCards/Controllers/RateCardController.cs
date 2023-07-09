
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
    }
}