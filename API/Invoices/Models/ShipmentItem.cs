using System.ComponentModel.DataAnnotations.Schema;

namespace Invoices.Models
{
    public class ShipmentItem
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("shipmentid")]
        public int ShipmentId { get; set; }

        [Column("collectionid")]
        public int CollectionId { get; set; }
    }
}