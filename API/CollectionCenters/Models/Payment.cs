namespace CollectionCenters.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
