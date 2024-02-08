using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("vehicles")]
public class Vehicle
{
    public int Id { get; set; }
    public int TransporterId { get; set; }
    public string? VehicleType { get; set; }
    public string? RtoNumber { get; set; }
}
