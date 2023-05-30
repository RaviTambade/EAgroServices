using System.Reflection.Metadata;
using System.Threading.Tasks;
using MerchantsAPI.Models;
using MerchantsAPI.Services;
using MerchantsAPI.Services.Interfaces;
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
    [HttpGet]
    public async Task<List<Merchant>> GetMerchants()
    {
        return await _service.GetMerchants();
    }
    [HttpGet("{id}")]
    public async Task<Merchant> GetMerchant(int id)
    {
        return await _service.GetMerchant(id);
    }
      [HttpGet("{id}/sellsrecord")]
    public async Task<List<MerchantRecord>> GetMerchantSellRecords(int id)
    {
        return await _service.GetMerchantSellRecords(id);
    }

    
}
