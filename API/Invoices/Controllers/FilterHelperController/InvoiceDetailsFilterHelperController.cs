
using Invoices.Models;
using Invoices.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace Invoices.Controllers
{
    [ApiController]
    [Route("/api/collectioncenterinvoice/filterhelper")]
    public class CollectionCenterInvoiceHelperController : ControllerBase
    {
        private readonly IFilterHelperService<CollectionCenterInvoice> _srv;

        public CollectionCenterInvoiceHelperController(IFilterHelperService<CollectionCenterInvoice> srv)
        {
            _srv = srv;
        }

         [HttpGet("getpropertynames")]
        public List<string> GetPropertyNames()
        {
            return _srv.GetPropertyNames();
        }

        [HttpGet("getequalproperties")]
        public List<string> GetEqualProperties()
        {
            return _srv.GetEqualProperties();
        }

        [HttpGet("getrangeproperties")]
        public List<string> GetRangeProperties()
        {
            return _srv.GetRangeProperties();
        }

        [HttpGet("getdaterangeproperties")]
        public List<string> GetDateRangeProperties()
        {
            return _srv.GetDateRangeProperties();
        }


    }
}