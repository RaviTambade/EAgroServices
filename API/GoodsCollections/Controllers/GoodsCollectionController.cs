using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Entities;
using Transflower.EAgroServices.GoodsCollections.Extensions;
using Transflower.EAgroServices.GoodsCollections.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.EAgroServices.GoodsCollections.Controllers;

[ApiController]
[Route("/api/goodscollections")]
public class GoodsCollectionController : ControllerBase
{
    private readonly IGoodsCollectionService _service;

    public GoodsCollectionController(IGoodsCollectionService service)
    {
        _service = service;
    }

    [HttpPost("{collectionCenterId}")]
    public async Task<List<Collection>>? GetCollections(
        int collectionCenterId,
        [FromBody] FilterRequest request,
        [FromQuery] int pageNumber,
        [FromQuery] string type
    )
    {
        var collections = await _service.GetCollections(
            collectionCenterId,
            request,
            pageNumber,
            type
        );
        Response.AddPaginationHeader(collections);
        return collections;
    }
    [HttpGet("collectionlist/{collectionCenterId}")]
    public async Task<List<CollectionList>>? GetCollectionList(
        int collectionCenterId,
        // [FromBody] FilterRequest request,
        // [FromQuery] int pageNumber,
         [FromQuery] string type
     )
     {
    //     var collections = await _service.GetCollections(
    //         collectionCenterId,
    //         request,
    //         pageNumber,
    //         type
    //     );
    //     Response.AddPaginationHeader(collections);
         return await _service.GetCollectionList(1,"verified");
    }

    [HttpGet("{collectionId}")]
    public async Task<GoodsCollection?> GetById(int collectionId)
    {
        return await _service.GetById(collectionId);
    }

    [HttpGet("verified/{farmerId}")]
    public async Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId)
    {
        return await _service.GetVerifiedCollection(farmerId);
    }

    [HttpPost]
    public async Task<bool> Insert(GoodsCollection collection)
    {
        return await _service.Insert(collection);
    }

    [HttpPut]
    public async Task<bool> Update(GoodsCollection collection)
    {
        return await _service.Update(collection);
    }

    [HttpDelete("{collectionId}")]
    public async Task<bool> Delete(int collectionId)
    {
        return await _service.Delete(collectionId);
    }

    [HttpGet("farmercollection/{farmerId}")]
    public async Task<List<FarmerCollection>> FarmerCollections(int farmerId)
    {
        return await _service.FarmerCollection(farmerId);
    }

    [HttpPost("verified/collectioncenter/{collectionCenterId}")]
    public async Task<List<VerifiedCollectionDetail>>? GetVerifiedCollections(
        int collectionCenterId,
        [FromBody] FilterRequest request,
        [FromQuery] int pageNumber
    )
    {
        var collectionDetails = await _service.GetVerifiedCollections(
            collectionCenterId,
            request,
            pageNumber
        );
        Response.AddPaginationHeader(collectionDetails);
        return collectionDetails;
    }

    [HttpGet("containertypes")]
    public async Task<List<string?>> GetContainerTypes()
    {
        return await _service.GetContainerTypes();
    }

    [HttpGet("farmerunverifiedcollection/{farmerId}")]
    public async Task<List<FarmerCollection>> GetVerifiedFarmerCollections(int farmerId)
    {
        return await _service.GetUnverifiedCollectionsOfFarmer(farmerId);
    }
    [HttpGet("verifiedcollectiondetail/{collectionId}")]
    public async Task<VerifiedCollectionDetail> GetVerifiedCollections(int collectionId)
    {
        return await _service.GetVerifiedCollectionDetail(collectionId);
    }
    [HttpGet("verifiedcollectionlist/{collectionCenterId}")]
    public async Task<List<CollectionList>> GetVerifiedCollectionlist(int collectionCenterId)
    {
        return await _service.GetVerifiedCollectionList(collectionCenterId);
    }

 [HttpGet("collections/{farmerid}")]
    public async Task<List<CollectionList>>? GetCollections(
        int farmerid,
         [FromQuery] string type
     )
     {
 
         return await _service.GetCollectionList(farmerid,type);
     }




    
}
