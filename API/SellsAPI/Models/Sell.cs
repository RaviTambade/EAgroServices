using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Sell
{
    private double netWeight;
    private double ratePerKg;

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
    public double NetWeight { get => netWeight=Math.Round(netWeight,2); set => netWeight = value; }

    [Column("rateperkg")]
    public double RatePerKg { get => ratePerKg=Math.Round(ratePerKg,2); set => ratePerKg = value; }

    [Column("date")]
    public DateTime Date { get; set; }

    public Sell()
    {
        Date = DateTime.Now;
    }

}