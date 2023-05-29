using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class MerchantRecord
{
    private double ratePerKg;
    private double netWeight;
    private double totalAmount;
    public string? ContainerType{get;set;}
    public string? Grade{get;set;}
    public int Quantity{get;set;}
    public double NetWeight { get => netWeight=Math.Round(netWeight,2); set => netWeight = value; }
    public double RatePerKg { get => ratePerKg=Math.Round(ratePerKg,2); set => ratePerKg = value; }
    public double TotalAmount { get => totalAmount=Math.Round(totalAmount,2); set => totalAmount = value; }
    public string? TruckNumber{get;set;}
    public DateTime Date{get;set;}
    public string? VarietyName{get;set;}
}