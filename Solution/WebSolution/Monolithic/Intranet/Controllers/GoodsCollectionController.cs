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
        _goodsCollectionService=goodsCollectionService;
    }

[HttpGet]
    public async Task<IEnumerable<GoodsCollection>> GetGoodsCollections()
    {
        IEnumerable<GoodsCollection>  goodsCollection=await _goodsCollectionService.FindAll();
        return goodsCollection;
    }
[HttpGet]
[Route("{id}")]
    public async Task<GoodsCollection> GetGoodsCollectionById(int id)
    {
        GoodsCollection  goodsCollection=await _goodsCollectionService.FindById(id);
        return goodsCollection;
    }

[HttpPost]
[Route("Add")]
    public async Task  Add(GoodsCollection goodsCollection)
    {
         await _goodsCollectionService.Add(goodsCollection);
    }

    [HttpPut]
[Route("Update")]
    public async Task  Update(GoodsCollection goodsCollection)
    {
         await _goodsCollectionService.Update(goodsCollection);
    }

        [HttpDelete]
[Route("Delete")]
    public async Task  Delete(int id)
    {
         await _goodsCollectionService.Delete(id);
    }
}  
