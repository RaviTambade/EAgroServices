
using System.Collections.Generic;

namespace BillingAPI.Models;
public class FarmerBill
{
    public int BillId { get; set; }
    public int FarmerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PaymentMode { get; set; }
    public double BillTotal { get; set; }
    public DateTime BillDate { get; set; }
    public List<BillProduct> BillProduct{ get; set; }
    public FarmerBill()
    {
        this.BillProduct= new List<BillProduct>();
    }
}