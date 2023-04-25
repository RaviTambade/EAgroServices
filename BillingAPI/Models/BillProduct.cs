
namespace BillingAPI.Models;
public class BillProduct
{
    // public int BillId { get; set; }
    public int ProductId { get; set; }
    public string ProductTitle { get; set; }
    public int Quantity { get; set; }
    public double UnitPrice { get; set; }

    public double Amount{get;set;}
    

}