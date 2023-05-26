namespace PurchasingAPI.Models;

public class PurchaseViewModel
{
    public PurchaseItem? PurchaseItem { get; set; }
    public PurchaseBilling? PurchaseBilling { get; set; }
    public string? FarmerName { get; set; }
    public string? VarietyName { get; set; }
}
