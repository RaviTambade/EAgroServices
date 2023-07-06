using PaymentAPI.Models;

namespace BankingService.Models;
public class CreditCardPayment{

    public CardPayment? CardPayment { get; set; }
    public Payment? Payment { get; set; }
}