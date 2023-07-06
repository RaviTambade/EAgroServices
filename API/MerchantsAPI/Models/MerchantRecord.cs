using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class MerchantRecord
{
    private double ratePerKg;
    private double netWeight;
    public string? ContainerImage{get;set;}
    public string? Grade{get;set;}
    public int Quantity{get;set;}
    public double NetWeight { get => netWeight=Math.Round(netWeight,2); set => netWeight = value; }
    public double RatePerKg { get => ratePerKg=Math.Round(ratePerKg,2); set => ratePerKg = value; }
    public string? VehicleNumber{get;set;}
    public DateTime Date{get;set;}
    public string? CropImage{get;set;}
    public int CollectionId{get;set;}
    public int SellId{get;set;}
}