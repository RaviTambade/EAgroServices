using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.EAgroServices.GoodsCollections.Controllers;

[ApiController]
[Route("/api/verifiedcollectiondetails/filterhelper")]
public class VerifiedCollectionDetailsFilterHelperController : ControllerBase
{
    private readonly IFilterHelperService<VerifiedCollectionDetail> _service;

    public VerifiedCollectionDetailsFilterHelperController(
        IFilterHelperService<VerifiedCollectionDetail> service
    )
    {
        _service = service;
    }

    [HttpGet("getpropertynames")]
    public List<string> GetPropertyNames()
    {
        return _service.GetPropertyNames();
    }

    [HttpGet("getequalproperties")]
    public List<string> GetEqualProperties()
    {
        return _service.GetEqualProperties();
    }

    [HttpGet("getrangeproperties")]
    public List<string> GetRangeProperties()
    {
        return _service.GetRangeProperties();
    }

    [HttpGet("getdaterangeproperties")]
    public List<string> GetDateRangeProperties()
    {
        return _service.GetDateRangeProperties();
    }
}
