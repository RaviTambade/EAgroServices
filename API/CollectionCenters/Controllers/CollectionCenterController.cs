using Transflower.EAgroServices.CollectionCenters.Models;
using Transflower.EAgroServices.CollectionCenters.Entities;
using Transflower.EAgroServices.CollectionCenters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.EAgroServices.CollectionCenters.Controllers;

[ApiController]
[Route("/api/collectioncenters")]
public class CollectionCenterController : ControllerBase
{
    private readonly ICollectionCenterService _service;

    public CollectionCenterController(ICollectionCenterService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<CollectionCenter>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{collectionCenterId}")]
    public async Task<CollectionCenter?> GetById(int collectionCenterId)
    {
        return await _service.GetById(collectionCenterId);
    }

    [HttpPost]
    public async Task<bool> Insert(CollectionCenter collectionCenter)
    {
        return await _service.Insert(collectionCenter);
    }

    [HttpPut]
    public async Task<bool> Update(CollectionCenter collectionCenter)
    {
        return await _service.Update(collectionCenter);
    }

    [HttpDelete("{collectionCenterId}")]
    public async Task<bool> Delete(int collectionCenterId)
    {
        return await _service.Delete(collectionCenterId);
    }

    [HttpGet("corporateid/{collectionCenterId}")]
    public async Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId)
    {
        return await _service.GetCorporateIdByCollectionCenterId(collectionCenterId);
    }

    [HttpGet("managerid/{managerId}")]
    public async Task<int> GetCollectionCenterIdByManagerId(int managerId)
    {
        return await _service.GetCollectionCenterIdByManagerId(managerId);
    }

    [HttpGet("collectioncenterandcorporateid")]
    public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
    {
        return await _service.GetCollectionCenterAndCorporateId();
    }
}
