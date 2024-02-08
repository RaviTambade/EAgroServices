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
    public async Task<IEnumerable<GoodsCosting>> GetGoodsCostings()
    {
        IEnumerable<GoodsCosting> goodsCostings = await _goodsCostingService.FindAll();
        return goodsCostings;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<GoodsCosting> GetGoodsCostingById(int id)
    {
        GoodsCosting goodsCosting = await _goodsCostingService.FindById(id);
        return goodsCosting;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(GoodsCosting goodsCosting)
    {
        await _goodsCostingService.Add(goodsCosting);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(GoodsCosting goodsCosting)
    {
        await _goodsCostingService.Update(goodsCosting);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _goodsCostingService.Delete(id);
    }
}
