
using Microsoft.AspNetCore.Mvc;
using Transflower.EAgroservice.Models;
using Transflower.EAgroservice.Services.Interfaces;

namespace Transflower.EAgro.farmersGoodsCollections.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class farmersGoodsCollectionsController : ControllerBase
{

    private readonly IGoodsCollectionService _service;
    public farmersGoodsCollectionsController(IGoodsCollectionService service)
    {
        _service = service;
    }
    
    // httpGet : http://localhost:5290/api/assignedtask/assignedtask
    //[Authorize]
    [HttpGet]
    [Route ("{id}")]
 public async Task<int> GetTotalEntriesForFarmer(int id)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForFarmer(id);
    return goodsCollectionsCount;
}

  [HttpGet]
[Route("{id}/{collectiondate:datetime}")]
public async Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, DateTime collectiondate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForFarmerOnSpecificDate(id, collectiondate);
    return goodsCollectionsCount;
} 

[HttpGet]
[Route("{id}/{startDate:datetime}/{endDate:datetime}")]
public async Task<int> GetTotalEntriesBeetweenDates(int id, DateTime startDate, DateTime endDate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesBeetweenDates(id, startDate, endDate);
    return goodsCollectionsCount;
}

}