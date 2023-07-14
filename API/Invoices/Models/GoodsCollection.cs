using System.ComponentModel.DataAnnotations.Schema;

namespace Invoices.Models
{
    public class GoodsCollection
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("collectioncenterid")]
        public int CollectionCenterId { get; set; }

        [Column("farmerid")]
        public int FarmerId { get; set; }

        [Column("cropid")]
        public int CropId { get; set; }

        [Column("containertype")]
        public string ContainerType { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("weight")]
        public int Weight { get; set; }

        [Column("collectiondate")]
        public DateTime CollectionDate { get; set; }

    }
}
