using System.ComponentModel.DataAnnotations.Schema;
namespace TransportsAPI.Models;
public class FreightRate
{
    [Column("from_destination")]
    public string FromDestination { get; set; }

    [Column("to_destination")]
    public string ToDestination { get; set; }

    [Column("kilometers")]
    public int Kilometers { get; set; }

    [Column("rate_per_km")]
    public double RatePerKm { get; set; }

    [Column("bill_id")]
    public int BillId { get; set; }
}