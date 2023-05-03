namespace EAgroServicesViews.Models.PurchaseModels;
public class PurchaseItem
{
    public int PurchaseId { get; set; }
    public int FarmerId { get; set; }
    public int VarietyId { get; set; }
    public string ContainerType { get; set; }
    public string? Grade { get; set; }
    public int Quantity { get; set; }
    public double TotalWeight { get; set; }
    public double TareWeight { get; set; }
    public double NetWeight { get; set; }
    public double RatePerKg { get; set; }
    public double Amount { get; set; }
}