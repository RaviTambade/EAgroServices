using System.ComponentModel.DataAnnotations.Schema;

namespace PurchaseAPI.Models;
public class PurchaseBilling
{
    [Column("bill_id")]
    public int BillId { get; set; }

    [Column("purchase_id")]
    public int PurchaseId { get; set; }

    [Column("labour_charges")]
    public double LabourCharges { get; set; }

    [Column("total_amount")]
    public int TotalAmount { get; set; }
}