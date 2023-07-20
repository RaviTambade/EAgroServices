using System.ComponentModel.DataAnnotations.Schema;

namespace Shipments.Models
{
    public class TransporterPayment
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("shipmentid")]
        public int ShipmentId { get; set; }

        [Column("paymentid")]
        public int PaymentId { get; set; }
    }
}
