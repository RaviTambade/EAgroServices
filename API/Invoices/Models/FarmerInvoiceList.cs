namespace Transflower.Invoices.Models;

public class FarmerInvoiceList
{
    public DateTime CollectionDate { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string CropName { get; set; }
    public string PaymentStatus { get; set; }

}
