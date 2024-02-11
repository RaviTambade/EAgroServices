using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class GoodsCollectionController : ControllerBase
{
    private readonly IGoodsCollectionService _goodsCollectionService;

    public GoodsCollectionController(IGoodsCollectionService goodsCollectionService)
    {
        _goodsCollectionService = goodsCollectionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGoodsCollections()
    {
        try
        {
            IEnumerable<GoodsCollection> goodsCollection = await _goodsCollectionService.FindAll();
            if (goodsCollection == null)
            {
                return NoContent();
            }
            return Ok(goodsCollection);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error:{ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetGoodsCollectionById(int id)
    {
        try
        {
            GoodsCollection goodsCollection = await _goodsCollectionService.FindById(id);
            if (goodsCollection == null)
            {
                return NoContent();
            }
            return Ok(goodsCollection);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error:{ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(GoodsCollection goodsCollection)
    {
        try
        {
            await _goodsCollectionService.Add(goodsCollection);
            return CreatedAtAction(
                nameof(GetGoodsCollectionById),
                new { id = goodsCollection.Id },
                goodsCollection
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error:{ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(GoodsCollection goodsCollection)
    {
        try
        {
            await _goodsCollectionService.Update(goodsCollection);
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
            await _goodsCollectionService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
