using System.ComponentModel.DataAnnotations.Schema;

namespace GoodsCollections.Models
{
    public class VerifiedGoodsCollection
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("collectionid")]
        public int CollectionId { get; set; }

        [Column("grade")]
        public string Grade { get; set; }

        [Column("weight")]
        public double Weight { get; set; }

        [Column("inspectorid")]
        public int InspectorId { get; set; }

        [Column("inspectionDate")]
        public DateTime InspectionDate { get; set; }
    }
}
