using Microsoft.AspNetCore.Mvc;
using VarietiesAPI.Models;
using VarietiesAPI.Services.Interfaces;

namespace VarietiesAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class VarietyController : ControllerBase
{
    private readonly IVarietyService _service;
    public VarietyController(IVarietyService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Variety>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<Variety> GeById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] Variety variety)
    {
        return await _service.Insert(variety);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, [FromBody] Variety variety)
    {
        return await _service.Update(id, variety);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}