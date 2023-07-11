using System.ComponentModel.DataAnnotations.Schema;

namespace Shipments.Models;

public class Vehicle
{
    [Column("id")]
    public int Id { get; set; }

    [Column("transporterid")]
    public int TransporterId { get; set; }

    [Column("vehicletype")]
    public string VehicleType { get; set; }

    [Column("rtonumber")]
    public string RtoNumber { get; set; }
}
