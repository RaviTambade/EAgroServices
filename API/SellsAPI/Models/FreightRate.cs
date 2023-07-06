using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class FreightRate
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("fromdestination")]
    public string FromDestination { get; set; }

    [Column("todestination")]
    public string ToDestination { get; set; }

    [Column("kilometers")]
    public int Kilometers { get; set; }

    [Column("rateperkm")]
    public double RatePerKm { get; set; }

    [Column("billid")]
    public int BillId { get; set; }
}