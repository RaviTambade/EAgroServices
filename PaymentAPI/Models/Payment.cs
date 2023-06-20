using System;

namespace PaymentAPI.Models;
public class Payment{
    public int Id{get;set;}
    public int TransactionId{get;set;}
    public int BillId{get;set;}
    public DateTime Date{get;set;}
}