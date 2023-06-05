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
        System.Console.WriteLine("function called");
        return await _service.Insert(collection);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, Collection collection)
    {
        return await _service.Update(id, collection);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}