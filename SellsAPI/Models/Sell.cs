using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Sell
{
    [Column("sell_id")]
    public int SellId { get; set; }

    [Column("purchase_id")]
    public int PurchaseId { get; set; }

    [Column("merchant_id")]
    public int MerchantId { get; set; }

    [Column("truck_id")]
    public int TruckId { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("net_weight")]
    public Double NetWeight { get; set; }

    [Column("rate_per_kg")]
    public Double RatePerKg { get; set; }

    [Column("total_amount")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public Double TotalAmount { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Sell()
    {
        Date = DateTime.Now;
    }

}