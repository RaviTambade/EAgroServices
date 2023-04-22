using System.ComponentModel.DataAnnotations.Schema;
namespace PurchasedItemsAPI.Models;
public class PurchasedItem
{
    [Column("purchase_id")]
    public int PurchaseId { get; set; }

    [Column("farmer_id")]
    public int FarmerId { get; set; }

    [Column("variety")]
    public string? Variety { get; set; }

    [Column("bags")]
    public int Bags { get; set; }

    [Column("total_weight")]
    public double TotalWeight { get; set; }

    [Column("tare_weight")]
    public double TareWeight { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [Column("net_weight")]
    public double NetWeight { get; set; }

    [Column("rate_per_kg")]
    public double RatePerKg { get; set; }

    [Column("labour_charges")]
    public double LabourCharges { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    [Column("total_amount")]
    public double TotalAmount { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }

    public PurchasedItem(){
        Date=DateTime.Now;
    }
}
