using TransportsAPI.Models;

namespace TransportsAPI.Models;
public class SellBilling
{
    // public Transport Transports{get;set;}
    // public Sell? Sell{get;set;}
    public FreightRate? FreightRate{get;set;}
    public Billing? Billing{get;set;}
    public Truck Truck{get;set;}



}
//  SELECT transport_trucks.truck_number,sells_billing.freight_charges,sells_billing.`date` 
//  from transports INNER JOIN transport_trucks on transports.transport_id=transport_trucks.transport_id
// INNER JOIN sells ON sells.truck_id=transport_trucks.truck_id
// INNER join sells_billing on sells.sell_id=sells_billing.sell_id
// WHERE transports.transport_id=1;