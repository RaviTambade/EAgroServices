namespace BIService.Models
{
    public class WeekRevenue : IRevenueModel
    {
        public int WeekNumber { get; set; }
        public string StartOfWeek {get;set;}=string.Empty;
        public double Amount { get; set; }
    }
}
