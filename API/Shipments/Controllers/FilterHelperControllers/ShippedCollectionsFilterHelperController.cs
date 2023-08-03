
using Shipments.Models;
using Shipments.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace Shipments.Controllers
{
    [ApiController]
    [Route("/api/shippedcollections/filterhelper")]
    public class ShippedCollectionsFilterHelperController : ControllerBase
    {
        private readonly IFilterHelperService<ShippedCollection> _srv;

        public ShippedCollectionsFilterHelperController(IFilterHelperService<ShippedCollection> srv)
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