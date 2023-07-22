
namespace Shipments.Models
{
    public class MerchantShipment
    {
        public int Id { get; set; }
        public string  VehicleNumber { get; set; }
        public int Kilometers { get; set; }
        public string? DeliveryStatus { get; set; }
        public string PaymentStatus { get; set; } 
        public DateTime ShipmentDate { get; set ;}
        public double FreightCharges { get; set; }
    }
}