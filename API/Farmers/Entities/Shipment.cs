using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Transflower.EAgroServices.Farmers.Entities;
[Table("shipments")]
public class Shipment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("vehicleid")]
    public int VehicleId { get; set; }

    [Column("merchantid")]
    public int MerchantId { get; set; }

    [Column("kilometers")]
    public int Kilometers { get; set; }

    [Column("status")]
    public string? Status { get; set; }

    [Column("shipmentdate")]
    public DateTime ShipmentDate { get; set; }

    public Shipment()
    {
        ShipmentDate = DateTime.Now;
    }
}

