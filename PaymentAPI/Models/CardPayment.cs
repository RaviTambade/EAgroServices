using System.Runtime.CompilerServices;

namespace BankingService.Models;
public class CardPayment{
    public int AccountId{get;set;}
    public string CardNumber{get;set;}
    public double Amount{get;set;}
}