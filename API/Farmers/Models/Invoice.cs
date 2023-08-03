using System.ComponentModel.DataAnnotations.Schema;

namespace Farmers.Models

{
    public class Invoice
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("shipmentitemid")]
        public int ShipmentItemId { get; set; }

        [Column("rateperkg")]
        public double RatePerKg { get; set; }

        [Column("totalamount")]
        public double TotalAmount { get; set; }

        [Column("paymentstatus")]
        public string PaymentStatus { get; set; }

        [Column("invoicedate")]
        public DateTime InvoiceDate { get; set; }

        public Invoice()
        {
            InvoiceDate = DateTime.Now;
        }
    }
}
