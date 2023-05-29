using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class Sell
{
    [Column("id")]
    public int Id { get; set; }

    [Column("collectionid")]
    public int PurchaseId { get; set; }

    [Column("merchantid")]
    public int MerchantId { get; set; }

    [Column("vehicleid")]
    public int VehicleId { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("netweight")]
    public Double NetWeight { get; set; }

    [Column("rateperkg")]
    public Double RatePerKg { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Sell()
    {
        Date = DateTime.Now;
    }

}