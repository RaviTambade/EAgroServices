using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.Shipments.Entities;

[Table("verifiedgoodscollection")]
public class VerifiedCollection
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

    [Column("inspectiondate")]
    public DateTime InspectionDate { get; set; }
}
