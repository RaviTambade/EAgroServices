using Transflower.EAgroServices.RateCards.Entities;
using Transflower.EAgroServices.RateCards.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.RateCards.Controllers;
[ApiController]
[Route("/api/RateCard")]
public class RateCardController : ControllerBase
{
    private readonly IRateCardService _service;

    public RateCardController(IRateCardService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<RateCard>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<RateCard?> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost]
    [Route("Add")]
    public async Task<bool> Insert(RateCard ratecard)
    {
        return await _service.Insert(ratecard);
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<bool> Update(int id, RateCard ratecard)
    {
        return await _service.Update(id, ratecard);
    }

    [HttpDelete]
    [Route("{id}/remove")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}

