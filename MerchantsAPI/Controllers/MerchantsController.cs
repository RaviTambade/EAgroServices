using System.Reflection.Metadata;
using MerchantsAPI.Models;
using MerchantsAPI.Services;
using Microsoft.AspNetCore.Mvc;
namespace MerchantsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class MerchantsController : ControllerBase
{
    private readonly IMerchantService _service;
    public MerchantsController(IMerchantService service)
    {
        this._service = service;
    }

    [HttpGet("getallmerchants")]
    public async Task<List<Merchant>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("getbyid/{id}")]
    public async Task<Merchant> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] Merchant merchant)
    {
        return await _service.Insert(merchant);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Merchant merchant)
    {
        return await _service.Update(id, merchant);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);

    }
}