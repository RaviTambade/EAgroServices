using Microsoft.AspNetCore.Mvc;
using CropsAPI.Models;
using CropsAPI.Services.Interfaces;

namespace CropsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class CropsController : ControllerBase
{
    private readonly ICropService _service;
    public CropsController(ICropService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Crop>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<Crop> GeById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] Crop variety)
    {
        return await _service.Insert(variety);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, [FromBody] Crop variety)
    {
        return await _service.Update(id, variety);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}