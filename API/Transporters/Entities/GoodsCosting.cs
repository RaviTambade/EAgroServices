using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.Transporters.Entities;

[Table("goodscosting")]
public class GoodsCosting
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("shipmentitemid")]
    public int ShipmentItemId { get; set; }

    [Column("freightcharges")]
    public double FreightCharges { get; set; }

    [Column("labourcharges")]
    public double LabourCharges { get; set; }

    [Column("servicecharges")]
    public double ServiceCharges { get; set; }
}
