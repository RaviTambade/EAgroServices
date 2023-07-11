
namespace Shipments.Models
{
    public class MerchantShipment
    {
        public int Id { get; set; }
        public string  VehicleNumber { get; set; }
        public int Kilometers { get; set; }
        public string? Status { get; set; }
        public DateTime ShipmentDate { get; set ;}
    }
}