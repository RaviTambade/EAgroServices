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
    public async Task<IEnumerable<CollectionCenter>> GetCollectionCenters()
    {
        IEnumerable<CollectionCenter> collectionCenters = await _collectionCenterService.FindAll();
        return collectionCenters;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<CollectionCenter> GetCollectionCenterById(int id)
    {
        CollectionCenter collectionCenter = await _collectionCenterService.FindById(id);
        return collectionCenter;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(CollectionCenter collectionCenter)
    {
        await _collectionCenterService.Add(collectionCenter);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(CollectionCenter collectionCenter)
    {
        await _collectionCenterService.Update(collectionCenter);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _collectionCenterService.Delete(id);
    }
}
