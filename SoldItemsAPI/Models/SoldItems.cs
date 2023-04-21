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
    [Column("ret_per_kg")]
    public  double RetPerKg{get;set;}
    [Column("total_amount")]
    public double TotalAmount{get;set;}
    [Column("date")]
    public DateTime Date{get;set;}



}


