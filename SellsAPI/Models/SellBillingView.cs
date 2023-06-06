namespace SellsAPI.Models;
public class SellBillingView
{
    public Sell? Sell{get;set;}
    public FreightRate? FreightRate{get;set;}
    public Billing? Billing{get;set;}
    public string? FullName{get;set;}
    public string? VehicleNumber{get;set;}

}
