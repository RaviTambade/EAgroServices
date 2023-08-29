namespace Transflower.EAgroServices.Payments.Models;
public class FarmerServicePayment
{
    public int CollectionId { get; set; }
    public int TransactionId { get; set; }
    public double Amount { get; set; }
    public string? PaymentFor { get; set; }
}
