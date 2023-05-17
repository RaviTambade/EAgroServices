using System.ComponentModel.DataAnnotations.Schema;
namespace TransportsAPI.Models;
public class FreightRate
{
    private double ratePerKm;

    [Column("from_destination")]
    public string FromDestination { get; set; }

    [Column("to_destination")]
    public string ToDestination { get; set; }

    [Column("kilometers")]
    public int Kilometers { get; set; }

    [Column("rate_per_km")]
    public double RatePerKm { get => ratePerKm=Math.Round(ratePerKm,2); set => ratePerKm = value; }

    [Column("bill_id")]
    public int BillId { get; set; }
}