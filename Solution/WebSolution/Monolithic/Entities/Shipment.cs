using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("shipments")]
public class Shipment
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    public int MerchantId { get; set; }
    public int Kilometers { get; set; }
    public string? Status { get; set; }
    public DateTime ShipmentDate { get; set; }

    public Shipment()
    {
        ShipmentDate = DateTime.Now;
    }
}

