using System.ComponentModel.DataAnnotations.Schema;
namespace GoodsCollections.Models;
public class FarmerCollection
{

    public int Id { get; set; }
    public int CollectionCenterId { get; set; }
    public int CorporateId { get; set; }
    public int InspectorId { get; set; }
    public string CropName { get; set; }
    public string ImageUrl { get; set; }
    public string ContainerType { get; set; }
    public int Quantity { get; set; }
    public double Weight { get; set; }
    public DateTime CollectionDate { get; set; }
    public string Grade { get; set; }

    public double VerifiedWeight { get; set; }

    public DateTime InspectionDate { get; set; }
}
