
using Transflower.EAgroServices.Payments.Models;
using Transflower.EAgroServices.Payments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.Payments.Controllers;
[ApiController]
[Route("/api/transporter/payments")]
public class TransporterPaymentController : ControllerBase
{
    private readonly ITransporterPaymentService _service;

    public TransporterPaymentController(ITransporterPaymentService service)
    {
        _service = service;
    }
    [HttpGet("ispaid/{shipmentId}")]
    public async Task<bool> IsShipmentPaymentPaid(int shipmentId)
    {
        return await _service.IsShipmentPaymentPaid(shipmentId);
    }

    [HttpPost]
    public async Task<bool> TransporterPayment(TransporterPayment payment)
    {
        return await _service.TransporterPayment(payment);
    }

}
