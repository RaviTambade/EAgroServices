using System.ComponentModel.DataAnnotations.Schema;

namespace CollectionAPI.Models;

public class CollectionBill
{
    public int BillId { get; set; }
    public double LabourCharges { get; set; }
    public int Amount { get; set; }
    public string? FarmerName { get; set; }
    public DateTime BillingDate { get; set; }
    public DateTime CollectionDate { get; set; }
    
}
