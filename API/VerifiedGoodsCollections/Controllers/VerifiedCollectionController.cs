using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Transflower.VerifiedGoodsCollections.Models;
using Transflower.VerifiedGoodsCollections.Services.Interfaces;

namespace VerifiedGoodsCollections.Controller;

[ApiController]
[Route("/api/verifiedcollections")]
public class VerifiedCollectionsController : ControllerBase
{
    private readonly IVerifiedCollectionService _svc;

    public VerifiedCollectionsController(IVerifiedCollectionService svc)
    {
        _svc = svc;
    }

    [HttpGet]
    [Route("")]
    public async Task<List<VerifiedCollection>> GetAll()
    {
        List<VerifiedCollection> verifiedCollections = await _svc.GetAll();
        return verifiedCollections;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<VerifiedCollection> GetVerifiedCollection(int id)
    {
        VerifiedCollection verifiedCollection = await _svc.GetVerifiedCollection(id);
        return verifiedCollection;
    }

    [HttpGet("grades")]
    public async Task<List<string>> GetGrades()
    {
        return await _svc.GetGrades();
    }

    [HttpGet("containertypes")]
    public async Task<List<string>> GetContinerTypes()
    {
        return await _svc.GetContinerTypes();
    }

    [HttpPost]
    [Route("")]
    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
        bool status = await _svc.Insert(verifiedCollection);
        return status;
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<bool> Update(int id, VerifiedCollection verifiedCollection)
    {
        bool status = await _svc.Update(id, verifiedCollection);
        return status;
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(int id)
    {
        bool status = await _svc.Delete(id);
        return status;
    }
}
