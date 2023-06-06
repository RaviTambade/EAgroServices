using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Sell
{
    private double netWeight;
    private double ratePerKg;
    // private double totalAmount;

    [Column("id")]
    public int Id { get; set; }

    [Column("collectionid")]
    public int CollectionId { get; set; }

    [Column("merchantid")]
    public int MerchantId { get; set; }

    [Column("vehicleid")]
    public int VehicleId { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("netweight")]
    public Double NetWeight { get => netWeight=Math.Round(netWeight,2); set => netWeight = value; }

    [Column("rateperkg")]
    public Double RatePerKg { get => ratePerKg=Math.Round(ratePerKg,2); set => ratePerKg = value; }

    // [Column("totalamount")]
    // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    // public Double TotalAmount { get => totalAmount=Math.Round(totalAmount,2); set => totalAmount = value; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Sell()
    {
        Date = DateTime.Now;
    }

}