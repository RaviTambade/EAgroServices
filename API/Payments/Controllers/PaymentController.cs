using Payments.Models;
using Payments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Payments.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _srv;

        public PaymentController(IPaymentService srv)
        {
            _srv = srv;
        }

        [HttpPost]
        public async Task<bool> Add(FarmerServicePayment payment)
        {
            return await _srv.Add(payment);
        }
    }
}
