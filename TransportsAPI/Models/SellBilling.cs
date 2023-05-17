using TransportsAPI.Models;

namespace TransportsAPI.Models;
public class SellBilling
{
    public FreightRate? FreightRate{get;set;}
    public Billing? Billing{get;set;}
    public Truck Truck{get;set;}
}
