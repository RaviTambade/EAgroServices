using System.ComponentModel.DataAnnotations.Schema;

namespace Shipments.Entities
{
    public class CollectionCenter
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("corporateid")]
        public int CorporateId { get; set; }

        [Column("inspectorid")]
        public int InspectorId { get; set; }
    }
}
