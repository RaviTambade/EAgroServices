using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class FreightRate
{
    private double ratePerKm;

    [Column("id")]
    public int Id { get; set; }

    [Column("fromdestination")]
    public string? FromDestination { get; set; }

    [Column("todestination")]
    public string? ToDestination { get; set; }

    [Column("kilometers")]
    public int Kilometers { get; set; }

    [Column("rateperkm")]
    public double RatePerKm { get => ratePerKm = Math.Round(ratePerKm, 2); set => ratePerKm = value; }

    [Column("billid")]
    public int BillId { get; set; }
}