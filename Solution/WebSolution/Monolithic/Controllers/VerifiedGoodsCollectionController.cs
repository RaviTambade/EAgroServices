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
    public async Task<IEnumerable<VerifiedGoodsCollection>> GetVerifiedGoodsCollections()
    {
        IEnumerable<VerifiedGoodsCollection> verifiedGoodsCollections = await _verifiedGoodsCollectionService.FindAll();
        return verifiedGoodsCollections;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<VerifiedGoodsCollection> GetVerifiedGoodsCollectionById(int id)
    {
        VerifiedGoodsCollection verifiedGoodsCollection = await _verifiedGoodsCollectionService.FindById(id);
        return verifiedGoodsCollection;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(VerifiedGoodsCollection verifiedGoodsCollection)
    {
        await _verifiedGoodsCollectionService.Add(verifiedGoodsCollection);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(VerifiedGoodsCollection verifiedGoodsCollection)
    {
        await _verifiedGoodsCollectionService.Update(verifiedGoodsCollection);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _verifiedGoodsCollectionService.Delete(id);
    }
}
