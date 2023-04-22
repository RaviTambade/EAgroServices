using SoldItemsAPI.Models;
using SoldItemsAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace SoldItemsAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SoldItemsController : ControllerBase
    {
        private readonly ISoldItemsService _srv;
        public SoldItemsController(ISoldItemsService srv)
        {
            this._srv = srv;
        }
        [HttpGet]
        [Route("getallSoldItemsDetails")]
        public async Task<IEnumerable<SoldItems>> GetSoldItemsDetails()
        {
            IEnumerable<SoldItems> soldItems = await _srv.GetSoldItemsDetails();
            return soldItems;
        }

        [HttpGet]
        [Route("getdetails/{id}")]
        public async Task<SoldItems> GetById(int id)
        {
            SoldItems soldItems = await _srv.GetById(id);
            return soldItems;
        }

        [HttpPost]
        [Route("insert")]
        public async Task<bool> Insert([FromBody] SoldItems soldItems)
        {
            return await _srv.Insert(soldItems);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<bool> Update(int id, [FromBody] SoldItems soldItems)
        { 
             return await _srv.Update(id, soldItems);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

    }
}




