      using System.ComponentModel.DataAnnotations.Schema;

namespace RateCards.Models
{
    public class RateCard
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("amount")]
        public double Amount { get; set; }

    }
}