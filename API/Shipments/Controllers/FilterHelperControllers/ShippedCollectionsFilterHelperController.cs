using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Shipments.Controllers;

[ApiController]
[Route("/api/shippedcollections/filterhelper")]
public class ShippedCollectionsFilterHelperController : ControllerBase
{
    private readonly IFilterHelperService<ShippedCollection> _service;

    public ShippedCollectionsFilterHelperController(IFilterHelperService<ShippedCollection> service)
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
