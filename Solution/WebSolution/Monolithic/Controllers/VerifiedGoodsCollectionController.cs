using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;
namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class VerifiedGoodsCollectionController : ControllerBase
{
    private readonly IVerifiedGoodsCollectionService _verifiedGoodsCollectionService;

    public VerifiedGoodsCollectionController(IVerifiedGoodsCollectionService verifiedGoodsCollectionService)
    {
        _verifiedGoodsCollectionService = verifiedGoodsCollectionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetVerifiedGoodsCollections()
    {
        try
        {
        IEnumerable<VerifiedGoodsCollection> verifiedGoodsCollections = await _verifiedGoodsCollectionService.FindAll();
            if (verifiedGoodsCollections == null)
            {
                return NoContent();
            }
            return Ok(verifiedGoodsCollections);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetVerifiedGoodsCollectionById(int id)
    {
        try
        {
        VerifiedGoodsCollection verifiedGoodsCollection = await _verifiedGoodsCollectionService.FindById(id);
             if (verifiedGoodsCollection == null)
            {
                return NoContent();
            }
            return Ok(verifiedGoodsCollection);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(VerifiedGoodsCollection verifiedGoodsCollection)
    {
        try{
        await _verifiedGoodsCollectionService.Add(verifiedGoodsCollection);
               return CreatedAtAction(
                nameof(GetVerifiedGoodsCollectionById),
                new { id = verifiedGoodsCollection.Id },
                verifiedGoodsCollection
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(VerifiedGoodsCollection verifiedGoodsCollection)
    {
        try
        {
        await _verifiedGoodsCollectionService.Update(verifiedGoodsCollection);
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
        await _verifiedGoodsCollectionService.Delete(id);
                  return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
