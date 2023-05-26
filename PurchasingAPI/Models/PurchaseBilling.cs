using System.ComponentModel.DataAnnotations.Schema;

namespace PurchasingAPI.Models;

public class PurchaseBilling
{
    [Column("bill_id")]
    public int Id { get; set; }

    [Column("purchase_id")]
    public int PurchaseId { get; set; }

    [Column("labour_charges")]
    public double LabourCharges { get; set; }

    [Column("total_amount")]
    public int TotalAmount { get; set; }

    [Column("date")]
    public DateTime Date { get; set; }
}
