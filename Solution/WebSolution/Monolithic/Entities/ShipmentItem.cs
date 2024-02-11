using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("shipmentitems")]
public class ShipmentItem
{
    public int Id { get; set; }
    public int ShipmentId { get; set; }
    public int CollectionId { get; set; }
}
