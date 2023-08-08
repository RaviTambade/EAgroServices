namespace BIService.Models
{
    public class MonthRevenue : IRevenueModel
    {
        public string Month { get; set; }=string.Empty;
        // public int Year { get; set; }
        public double Amount { get; set; }
    }
}
