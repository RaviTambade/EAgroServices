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
    [HttpGet("{collectionId}")]
    public async Task<CollectionViewModel> GetCollection(int collectionId){
        return await _service.GetCollection(collectionId);
    }

     [HttpPost("getall")]
    public async Task<List<CollectionViewModel>> GetCollections([FromBody]StartDateFilter startDate)
    {
        Console.WriteLine(startDate.Date);
        return await _service.GetCollections(startDate);
    }

    [HttpGet("collectionbilling")]
    public async Task<List<CollectionBillingRecord>> GetCollectionBillingRecords()
    {
        return await _service.GetCollectionBillingRecords();
    }
    
     [HttpGet("{collectionId}/billing")]
    public async Task<CollectionBill> GetCollectionBill(int collectionId){
       return await _service.GetCollectionBill(collectionId);
    }

     [HttpGet("{collectionId}/sell")]
    public async Task<SellViewModel> GetCollectionSell(int collectionId){
       return await _service.GetCollectionSell(collectionId);
    }

    // [HttpGet("{id}/collectionbilling")]
    // public async Task<CollectionBillingRecord> GetCollectionBillingRecord(int id)
    // {
    //     return await _service.GetCollectionBillingRecord(id);
    // }

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
    
    [HttpGet("getcontainers")]
    public async Task<List<LabourRate>> GetContainers(){
      return  await _service.GetContainers();
    }


     [HttpGet("{collectionId}/farmer")]
    public async Task<int> GetFarmer(int collectionId){
       return await _service.GetFarmer(collectionId);
    }


}