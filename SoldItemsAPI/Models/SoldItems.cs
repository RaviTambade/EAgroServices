using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SoldItemsAPI.Models;

public class SoldItems
{
    [Column("sell_id")]
    public int SellId{get;set;}
    [Column("purchase_id")]
    public int PurchaseId{get;set;}
    [Column("consignee_id")]
    public int ConsigneeId{get;set;}
    [Column("transport_id")]
    public int TransportId{get;set;}
    [Column("net_weight")]
    public double NetWeight{get;set;}
    [Column("rate_per_kg")]
    public  double RatePerKg{get;set;}
    
     [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
     [Column("total_amount")]
    public double TotalAmount{get;set;}
    [Column("date")]
    public DateTime Date{get;set;}

    public SoldItems(){
        Date=DateTime.Now;
    }

}


