using System.Text.Json.Serialization;

namespace Transflower.Invoices.Models;

    public class InvoiceDetail
    {
        public int Id { get; set; }
        public int FarmerId { get; set; }
        public string? CropName { get; set; }
        public int Quantity { get; set; }
        public double Weight { get; set; }
        public double RatePerKg { get; set; }
        public double TotalAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime InvoiceDate { get; set; }
    }

