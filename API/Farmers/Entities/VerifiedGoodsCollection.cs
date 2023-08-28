using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Transflower.EAgroServices.Farmers.Entities;
[Table("verifiedgoodscollection")]
public class VerifiedGoodsCollection
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("collectionid")]
    public int CollectionId { get; set; }

    [Column("grade")]
    public string? Grade { get; set; }

    [Column("weight")]
    public double Weight { get; set; }

    [Column("inspectorid")]
    public int InspectorId { get; set; }

    [Column("inspectionDate")]
    public DateTime InspectionDate { get; set; }
}

