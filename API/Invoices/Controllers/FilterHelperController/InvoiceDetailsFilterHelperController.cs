
using Transflower.Invoices.Models;
using Transflower.Invoices.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace Transflower.Invoices.Controllers;

[ApiController]
[Route("/api/collectioncenterinvoice/filterhelper")]
public class CollectionCenterInvoiceHelperController : ControllerBase
{
    private readonly IFilterHelperService<CollectionCenterInvoice> _service;

    public CollectionCenterInvoiceHelperController(IFilterHelperService<CollectionCenterInvoice> service)
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
