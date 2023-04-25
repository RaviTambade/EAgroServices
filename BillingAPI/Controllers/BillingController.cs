using Microsoft.AspNetCore.Mvc;
using BillingAPI.Models;
using BillingAPI.Services.Interfaces;

namespace BillingAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly IFarmerBillingService _service;

        public BillingController(IFarmerBillingService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("getallbills")]
        public List<FarmerBill> GetAllFarmerBills()
        {
            return _service.GetAllFarmerBills();
        }
    }
}
