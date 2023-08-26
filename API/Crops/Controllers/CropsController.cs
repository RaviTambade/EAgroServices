using Microsoft.AspNetCore.Mvc;
using Transflower.EAgroServices.Crops.Models;
using Transflower.EAgroServices.Crops.Entities;
using Transflower.EAgroServices.Crops.Services.Interfaces;

namespace Transflower.EAgroServices.Crops.Controller;

[ApiController]
[Route("/api/crops")]
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

    [HttpGet("names")]
    public async Task<List<string>> GetCropNames()
    {
        return await _service.GetCropNames();
    }

    [HttpGet("{id}")]
    public async Task<Crop?> GeById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpGet("nameswithid")]
    public async Task<List<CropDetail>> GetCropNamesWithId()
    {
        return await _service.GetCropNamesWithId();
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] Crop crop)
    {
        return await _service.Insert(crop);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, [FromBody] Crop crop)
    {
        return await _service.Update(id, crop);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}
