
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
    
    //[Authorize]
    [HttpGet]
    [Route ("{id}")]
 public async Task<int> GetTotalEntriesForFarmer(int id)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForFarmer(id);
    return goodsCollectionsCount;
}

  [HttpGet]
[Route("{id}/{collectiondate}")]
public async Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, string collectiondate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForFarmerOnSpecificDate(id, collectiondate);
    return goodsCollectionsCount;
} 

[HttpGet]
[Route("{id}/{startDate:datetime}/{endDate:datetime}")]
public async Task<int> GetTotalEntriesBeetweenDates(int id, DateOnly startDate, DateOnly endDate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesBeetweenDates(id, startDate, endDate);
    return goodsCollectionsCount;
}
// [HttpGet]
// [Route("{id}/{year}/{mode}")]
// public async Task<int> RevenueChart(int id, int year, string mode)
// {
//    return  await _service.RevenueChart(id, year, mode);

// }



 [HttpGet]
 [Route ("collectioncenter/{id}")]
 public async Task<int> GetTotalEntriesForCollectionCenter(int id)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForCollectionCenter(id);
    return goodsCollectionsCount;
}

  [HttpGet]
[Route("collectioncenter/{id}/{collectioncenterdate}")]
public async Task<int> GetTotalEntriesForCollectiionOnSpecificDate(int id, string collectioncenterdate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForCollectiionOnSpecificDate(id, collectioncenterdate);
    return goodsCollectionsCount;
} 

[HttpGet]
[Route("collectioncenter/{id}/{startDate:datetime}/{endDate:datetime}")]
public async Task<int> GetTotalEntriesForCollectiionBeetweenDate(int id, DateOnly startDate, DateOnly endDate)
{
    int goodsCollectionsCount = await _service.GetTotalEntriesForCollectiionBeetweenDate(id, startDate, endDate);
    return goodsCollectionsCount;
}

[HttpGet]
[Route("revenue/{id}")]
public async Task<int> GetTotalFarmerRevenue(int id)
{
    return await _service.GetTotalFarmerRevenue(id);
    
}

[HttpGet]
[Route("cropquantity/{collectionCenterId}/{currentDate}")]
public async Task<List<TotalCropQuantity>> GetTotalCropQuantity(int collectionCenterId, string currentDate)
{
    return await _service.TotalCropsQuantity(collectionCenterId,currentDate);
    
}
}