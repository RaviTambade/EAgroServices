namespace CollectionAPI.Models;
public class CollectionBillingRecord
{
    public Collection? Collection { get; set; }
    public Billing? Billing { get; set; }
    public string? FarmerName { get; set; }
    public string? Crop { get; set; }
}