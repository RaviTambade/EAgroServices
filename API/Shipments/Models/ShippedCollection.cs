namespace Shipments.Models;

public class ShippedCollection
{
    public int CollectionId { get; set; }
    public int CollectionCenterCorporateId { get; set; }
    public int MerchantCorporateId { get; set; }
    public int TransporterCorporateId { get; set; }
    public int FarmerId { get; set; }
    public string? CropName { get; set; }
    public string? VehicleNumber { get; set; }
    public string? Grade { get; set; } 
    public string? ContainerType { get; set; }
    public int Quantity { get; set; }
    public double TotalWeight { get; set; }
    public double NetWeight { get; set; }
    public DateTime CollectionDate { get; set; }
    public DateTime ShipmentDate { get; set; }

}
