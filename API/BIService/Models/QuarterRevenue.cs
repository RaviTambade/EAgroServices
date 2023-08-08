namespace BIService.Models
{
    public class QuarterRevenue : IRevenueModel
    {
        public int Quarter { get; set; }
        public string StartOfQuarter { get; set; } = string.Empty;
        public double Amount { get; set; }
    }
}
