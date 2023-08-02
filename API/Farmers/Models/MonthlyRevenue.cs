namespace Farmers.Models;
public class MonthlyRevenue
{
    public DateOnly InvoiceDate { get; set; }
    public double TotalAmount { get; set; }
}