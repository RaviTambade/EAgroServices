using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("invoices")]
public class Invoice
{
    public int Id { get; set; }
    public int ShipmentItemId { get; set; }
    public double RatePerKg { get; set; }
    public double TotalAmount { get; set; }
    public string? PaymentStatus { get; set; }
    public DateTime InvoiceDate { get; set; }
    public Invoice()
    {
        InvoiceDate = DateTime.Now;
    }
}

