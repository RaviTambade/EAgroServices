using System.Reflection.Metadata;
using RateApi.Models;
using RateApi.Services;
using Microsoft.AspNetCore.Mvc;
namespace RateApi.Controller;
[ApiController]
[Route("/api/[controller]")]
public class RatesController : ControllerBase
{
    private readonly IRateService _service;
    public RatesController(IRateService service)
    {
        this._service = service;
    }

    [HttpGet("getallRates")]
    public async Task<List<Rate>> GetAllRates()
    {
        return await _service.GetAllRates();
    }

    [HttpGet("GetById/{id}")]
    public async Task<Rate> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] Rate rate)
    {
         return await _service.Insert(rate);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Rate rate)
    {
        return await _service.Update(id, rate);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);

    }
}
