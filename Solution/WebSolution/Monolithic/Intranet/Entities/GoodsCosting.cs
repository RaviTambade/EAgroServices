
using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("goodscosting")]
public class GoodsCosting
{
    public int Id { get; set; }
    public int ShipmentItemId { get; set; }
    public double FreightCharges { get; set; }
    public double LabourCharges { get; set; }
    public double ServiceCharges { get; set; }
}

