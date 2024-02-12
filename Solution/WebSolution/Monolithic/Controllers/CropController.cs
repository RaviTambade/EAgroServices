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
    public async Task<IActionResult> GetCrops()
    {
        try
        {
            IEnumerable<Crop> crops = await _cropService.FindAll();
            if (crops == null)
            {
                return NoContent();
            }
            return Ok(crops);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internalserver error:{ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetCropById(int id)
    {
        try
        {
            Crop crop = await _cropService.FindById(id);
            if (crop == null)
            {
                return NoContent();
            }
            return Ok(crop);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internalserver error:{ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(Crop crop)
    {
        try
        {
            await _cropService.Add(crop);
            return CreatedAtAction(nameof(GetCropById), new { id = crop.Id }, crop);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error:{ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(Crop crop)
    {
        try
        {
            await _cropService.Update(crop);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error:{ex}");
        }
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _cropService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
