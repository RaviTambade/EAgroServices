using PaymentAPI.Models;
using PaymentAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BankingService.Models;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Runtime.ExceptionServices;

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
    public async Task<bool> Insert(CreditCardPayment creditCardPayment)
    {
        // CardPayment card = new CardPayment()
        // {
        //     AccountId = 2,
        //     CardNumber = "8778565645457878",
        //     Amount = 12000
        // };
        if (creditCardPayment.Payment == null || creditCardPayment.CardPayment == null)
        {
            return false;
        }
        var card = creditCardPayment.CardPayment;
        string jsonCard = JsonConvert.SerializeObject(card);
        var requestContent = new StringContent(jsonCard, Encoding.UTF8, "application/json");
        using (var httpClient = new HttpClient())
        {
            string apiUrl = "http://localhost:5181/api/CreditCards/cardpayment";
            using (var response = await httpClient.PostAsync(apiUrl, requestContent))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                System.Console.WriteLine(response);
                string? res = JsonConvert.DeserializeObject<string>(content);
                if (res != null)
                {
                    creditCardPayment.Payment.TransactionId = int.Parse(res);
                    Console.WriteLine(creditCardPayment.Payment.TransactionId);
                }
            }
            if (creditCardPayment.Payment.TransactionId == 0)
            {
                return false;
            }
            return await _service.Insert(creditCardPayment.Payment);
        }
    }

    [HttpGet("{billId}/checkbill")]
    public async Task<bool> CheckBill(int billId){
        Console.WriteLine(billId);
       return await _service.CheckBill(billId);
    }

    [HttpGet("makepayment/{billid}")]
    public async Task<MakePayment> MakePayment(int billId){
       return await _service.MakePayment(billId);
    }

}
