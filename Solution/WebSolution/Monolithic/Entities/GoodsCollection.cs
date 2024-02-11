using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("goodscollections")]
public class GoodsCollection
{
    public int Id { get; set; }
    public int CollectionCenterId { get; set; }
    public int FarmerId { get; set; }
    public int CropId { get; set; }
    public string? ContainerType { get; set; }
    public int Quantity { get; set; }
    public double Weight { get; set; }
    public DateTime CollectionDate { get; set; }

    public GoodsCollection()
    {
        CollectionDate = DateTime.Now;
    }
}

