
using Payments.Models;
using Payments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Payments.Controllers
{
    [ApiController]
    [Route("/api/transporter/payments")]
    public class TransporterPaymentController : ControllerBase
    {
        private readonly ITransporterPaymentService _srv;

        public TransporterPaymentController(ITransporterPaymentService srv)
        {
            _srv = srv;
        }
        [HttpGet("ispaid/{shipmentId}")]
         public async Task<bool> isShipmentPaymentPaid(int shipmentId)
        {
            return await _srv.isShipmentPaymentPaid(shipmentId);
        }

    }
}