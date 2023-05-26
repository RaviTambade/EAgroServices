using System.ComponentModel.DataAnnotations.Schema;

namespace PurchaseAPI.Models;

public class PurchaseItem
{
    [Column("purchase_id")]
    public int Id { get; set; }

    [Column("farmer_id")]
    public int FarmerId { get; set; }

    [Column("variety_id")]
    public int VarietyId { get; set; }

    [Column("container_type")]
    public string? ContainerType { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("grade")]
    public string? Grade { get; set; }

    [Column("total_weight")]
    public double TotalWeight { get; set; }

    [Column("tare_weight")]
    public double TareWeight { get; set; }

    [Column("net_weight")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public double NetWeight { get; set; }

    [Column("rate_per_kg")]
    public double RatePerKg { get; set; }

    public double Amount
    {
        get { return this.NetWeight * this.RatePerKg; }
    }

    [Column("date")]
    public DateTime Date { get; set; }
}
