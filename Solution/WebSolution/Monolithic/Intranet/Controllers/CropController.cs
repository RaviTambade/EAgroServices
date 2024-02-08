using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class CropController : ControllerBase
{
    private readonly ICropService _cropService;

    public CropController(ICropService cropService)
    {
        _cropService = cropService;
    }

    [HttpGet]
    public async Task<IEnumerable<Crop>> GetCrops()
    {
        IEnumerable<Crop> crops = await _cropService.FindAll();
        return crops;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Crop> GetCropById(int id)
    {
        Crop crop = await _cropService.FindById(id);
        return crop;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(Crop crop)
    {
        await _cropService.Add(crop);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(Crop crop)
    {
        await _cropService.Update(crop);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _cropService.Delete(id);
    }
}
