namespace Transporters.Models;
public class TransporterInvoice{
    public int MerchantId{get;set;}
    public DateTime Date{get;set;}
    public string? PaymentStatus{get;set;}
    public double FreightCharges{get;set;}
}