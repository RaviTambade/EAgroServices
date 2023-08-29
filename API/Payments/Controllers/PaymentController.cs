using Transflower.EAgroServices.Payments.Models;
using Transflower.EAgroServices.Payments.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Transflower.EAgroServices.Payments.Controllers;
[ApiController]
[Route("/api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentController(IPaymentService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<bool> AddPayment(FarmerServicePayment payment)
    {
        return await _service.AddPayment(payment);
    }
}
