using Transflower.EAgroServices.Merchants.Entities;
using Transflower.EAgroServices.Merchants.Models;
using Transflower.EAgroServices.Merchants.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.Merchants.Controllers;
[ApiController]
[Route("/api/merchants")]
public class MerchantController : ControllerBase
{
    private readonly IMerchantService _service;

    public MerchantController(IMerchantService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Merchant>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{merchantId}")]
    public async Task<Merchant?> GetById(int merchantId)
    {
        return await _service.GetById(merchantId);
    }

    [HttpPost]
    public async Task<bool> Insert(Merchant merchant)
    {
        return await _service.Insert(merchant);
    }

    [HttpPut]
    public async Task<bool> Update(Merchant merchant)
    {
        return await _service.Update(merchant);
    }

    [HttpDelete("{merchantId}")]
    public async Task<bool> Delete(int merchantId)
    {
        return await _service.Delete(merchantId);
    }

    [HttpGet("{merchantId}/getcorporate")]
    public async Task<int> GetCorporateId(int merchantId)
    {
        return await _service.GetCorporateId(merchantId);
    }

    [HttpGet("manager/{managerId}")]
    public async Task<int> GetMerchantId(int managerId)
    {
        return await _service.GetMerchantId(managerId);
    }

    [HttpGet("id/{corporateId}")]
    public async Task<int> GetId(int corporateId)
    {
        return await _service.GetId(corporateId);
    }

    [HttpGet("merchantandcorporateid")]
    public async Task<List<MerchantCorporate>> GetMerchantAndCorporateId()
    {
        return await _service.GetMerchantAndCorporateId();
    }
}
