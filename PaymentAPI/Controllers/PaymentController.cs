using System.Reflection.Metadata;
using System.Threading.Tasks;
using PaymentAPI.Models;
using PaymentAPI.Services;
using PaymentAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PaymentAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentsController(PaymentsController service)
    {
        this._service = service;
    }

    [HttpPost]
    public async Task<bool> Insert(Payment payment){

         using (var httpClient = new HttpClient()){
            
         }
        return _service.Insert(payment);
    }

}