using System.ComponentModel.DataAnnotations.Schema;

namespace Shipments.Entities
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
