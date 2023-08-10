
using GoodsCollections.Models;
using GoodsCollections.Extensions;
using Microsoft.AspNetCore.Mvc;


namespace GoodsCollections.Controllers
{
    [ApiController]
    [Route("/api/verifiedcollectiondetails/filterhelper")]
    public class VerifiedCollectionDetailsFilterHelperController : ControllerBase
    {
        private readonly IFilterHelperService<VerifiedCollectionDetails> _srv;

        public VerifiedCollectionDetailsFilterHelperController(IFilterHelperService<VerifiedCollectionDetails> srv)
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