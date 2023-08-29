namespace Transflower.EAgroServices.Shipments.Models;

public class VehicleCorporateShipment
{
    public int ShipmentId { get; set; }
    public int VehicleId { get; set; }
    public int CorporateId { get; set; }
    public string? VehicleType { get; set; }
    public string? RtoNumber { get; set; }
    public int Kilometers { get; set; }
    public string? Status { get; set; }
    public DateTime ShipmentDate { get; set; }
}
