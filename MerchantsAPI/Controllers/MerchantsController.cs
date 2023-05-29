using System.Reflection.Metadata;
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
    public async Task<List<Merchant>> GetAll()
    {
        return await _service.GetAll();
    }
    [HttpGet("{id}")]
    public async Task<Merchant> GetById(int id)
    {
        return await _service.GetById(id);
    }
}
