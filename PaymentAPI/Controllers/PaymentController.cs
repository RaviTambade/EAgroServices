using PaymentAPI.Models;
using PaymentAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BankingService.Models;
using System.Text;
using Newtonsoft.Json;

namespace PaymentAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentsController(IPaymentService service)
    {
        this._service = service;
    }

    [HttpPost]
    public async Task<bool> Insert(Payment payment)
    {
        CardPayment card = new CardPayment()
        {
            AccountId = 2,
            CardNumber = "8778565645457878",
            Amount = 12000
        };
        string jsonCard = JsonConvert.SerializeObject(card);
        var requestContent = new StringContent(jsonCard, Encoding.UTF8, "application/json");
        using (var httpClient = new HttpClient())
        {
            string apiUrl = "http://localhost:5181/api/CreditCards/cardpayment" ;
            using (var response = await httpClient.PostAsync(apiUrl, requestContent))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                System.Console.WriteLine(response);
                string? res = JsonConvert.DeserializeObject<string>(content);
                if (res != null){
                 payment.TransactionId=int.Parse(res);  
                 Console.WriteLine(  payment.TransactionId); 
                }
            }
            if(payment.TransactionId == 0){
                return false;
            }
            return await _service.Insert(payment);
        }
    }
}
