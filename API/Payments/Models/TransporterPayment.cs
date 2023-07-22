namespace Payments.Models
{
    public class TransporterPayment
    {
        public int TransactionId { get; set; }
        public int ShipmentId { get; set; }
        public double Amount { get; set; }
    }
}
