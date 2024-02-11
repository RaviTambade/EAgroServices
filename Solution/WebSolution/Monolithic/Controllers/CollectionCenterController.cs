using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class CollectionCenterController : ControllerBase
{
    private readonly ICollectionCenterService _collectionCenterService;

    public CollectionCenterController(ICollectionCenterService collectionCenterService)
    {
        _collectionCenterService = collectionCenterService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCollectionCenters()
    {
        try
        {
            IEnumerable<CollectionCenter> collectionCenters =
                await _collectionCenterService.FindAll();

            if (collectionCenters == null)
            {
                return NoContent();
            }

            return Ok(collectionCenters);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetCollectionCenterById(int id)
    {
        try
        {
            CollectionCenter collectionCenter = await _collectionCenterService.FindById(id);

            if (collectionCenter == null)
            {
                return NoContent();
            }
            return Ok(collectionCenter);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(CollectionCenter collectionCenter)
    {
        try
        {
            await _collectionCenterService.Add(collectionCenter);
            return CreatedAtAction(
                nameof(GetCollectionCenters),
                new { id = collectionCenter.Id },
                collectionCenter
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(CollectionCenter collectionCenter)
    {
        try
        {
            if (collectionCenter.Id == null)
            {
                return BadRequest("Invalid ID");
            }

            await _collectionCenterService.Update(collectionCenter);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _collectionCenterService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
