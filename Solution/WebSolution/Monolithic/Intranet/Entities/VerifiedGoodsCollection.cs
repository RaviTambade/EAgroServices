using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("verifiedgoodscollection")]
public class VerifiedGoodsCollection
{
    public int Id { get; set; }
    public int CollectionId { get; set; }
    public string? Grade { get; set; }
    public double Weight { get; set; }
    public int InspectorId { get; set; }
    public DateTime InspectionDate { get; set; }
}

