using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class TruckBilling{
    public Billing? Billing{get;set;}
    public FreightRate? FreightRate{get;set;}
    public string? TruckNumber{get;set;}
    
}