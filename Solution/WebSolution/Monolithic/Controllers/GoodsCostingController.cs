using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class GoodsCostingController : ControllerBase
{
    private readonly IGoodsCostingService _goodsCostingService;

    public GoodsCostingController(IGoodsCostingService goodsCostingService)
    {
        _goodsCostingService = goodsCostingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGoodsCostings()
    {
        try
        {
            IEnumerable<GoodsCosting> goodsCostings = await _goodsCostingService.FindAll();

            if (goodsCostings == null)
            {
                return NoContent();
            }
            return Ok(goodsCostings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetGoodsCostingById(int id)
    {
        try
        {
            GoodsCosting goodsCosting = await _goodsCostingService.FindById(id);

            if (goodsCosting == null)
            {
                return NoContent();
            }
            return Ok(goodsCosting);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> Add(GoodsCosting goodsCosting)
    {
        try
        {
            await _goodsCostingService.Add(goodsCosting);
            return CreatedAtAction(
                nameof(GetGoodsCostingById),
                new { id = goodsCosting.Id },
                goodsCosting
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> Update(GoodsCosting goodsCosting)
    {
        try
        {
            await _goodsCostingService.Update(goodsCosting);
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
            await _goodsCostingService.Delete(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}
