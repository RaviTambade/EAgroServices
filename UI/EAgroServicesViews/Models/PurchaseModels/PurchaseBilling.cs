
namespace EAgroServicesViews.Models.PurchaseModels;
public class PurchaseBilling
{
    public int BillId { get; set; }
    public int PurchaseId { get; set; }
    public double LabourCharges { get; set; }
    public int TotalAmount { get; set; }
}