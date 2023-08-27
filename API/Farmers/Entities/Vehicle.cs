using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Transflower.EAgroServices.Farmers.Entities;
[Table("vehicles")]
public class Vehicle
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("transporterid")]
    public int TransporterId { get; set; }

    [Column("vehicletype")]
    public string? VehicleType { get; set; }

    [Column("rtonumber")]
    public string? RtoNumber { get; set; }
}
