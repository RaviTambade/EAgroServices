namespace Payments.Models
{
    public class TransporterPayment
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public int PaymentId { get; set; }
    }
}
