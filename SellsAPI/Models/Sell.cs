using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Sell
{
    private double netWeight;
    private double ratePerKg;
    private double totalAmount;

    [Column("sell_id")]
    public int Id { get; set; }

    [Column("purchase_id")]
    public int PurchaseId { get; set; }

    [Column("merchant_id")]
    public int MerchantId { get; set; }

    [Column("truck_id")]
    public int TruckId { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("net_weight")]
    public Double NetWeight { get => netWeight=Math.Round(netWeight,2); set => netWeight = value; }

    [Column("rate_per_kg")]
    public Double RatePerKg { get => ratePerKg=Math.Round(ratePerKg,2); set => ratePerKg = value; }

    [Column("total_amount")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public Double TotalAmount { get => totalAmount=Math.Round(totalAmount,2); set => totalAmount = value; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Sell()
    {
        Date = DateTime.Now;
    }

}