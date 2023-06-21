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
            AccountId = 1,
            CardNumber = "123456",
            Amount = 1200
        };
        string jsonCard = System.Text.Json.JsonSerializer.Serialize(card);
        var requestContent = new StringContent(jsonCard, Encoding.UTF8, "application/json");
        using (var httpClient = new HttpClient())
        {
            string apiUrl = "http://localhost:5181/api/CreditCards/cardpayment" ;
            using (var response = await httpClient.PostAsync(apiUrl, requestContent))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                string? res = JsonConvert.DeserializeObject<string>(content);
                if (res != null){
                 payment.TransactionId=Convert.ToInt32(res);  
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
