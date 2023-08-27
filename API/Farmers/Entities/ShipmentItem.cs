using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Transflower.EAgroServices.Farmers.Entities;
[Table("shipmentitems")]
public class ShipmentItem
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("shipmentid")]
    public int ShipmentId { get; set; }

    [Column("collectionid")]
    public int CollectionId { get; set; }
}
