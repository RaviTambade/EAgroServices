
namespace BillingAPI.Models;
public class FarmerBill
{
    public int BillId { get; set; }
    public int FarmerId { get; set; }
    public enum CashMode { Cash = "Cash", Pending = "pending" };
    public double BillTotal { get; set; }
    public DateTime BillDate { get; set; }
}