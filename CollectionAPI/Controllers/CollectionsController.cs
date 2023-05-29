using Microsoft.AspNetCore.Mvc;
using CollectionAPI.Models;
using CollectionAPI.Services.Interfaces;

namespace CollectionAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionService _service;

    public CollectionsController(ICollectionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<CollectionBillingRecord>> GetCollectionBillingRecords()
    {
        return await _service.GetCollectionBillingRecords();
    }

    [HttpGet("{id}")]
    public async Task<CollectionBillingRecord> GetCollectionBillingRecord(int id)
    {
        return await _service.GetCollectionBillingRecord(id);
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] Collection collection)
    {
        System.Console.WriteLine("--> inside Request");
        System.Console.WriteLine(collection.ToString());
        return await _service.Insert(collection);
    }
}
