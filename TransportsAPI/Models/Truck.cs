using System.ComponentModel.DataAnnotations.Schema;
namespace TransportsAPI.Models;
public class Truck{
    [Column("truck_id")]
    public int TruckId{get;set;}
    [Column("transport_id")]
    public int TransportId{get;set;}
    [Column("truck_number")]
    public string? TruckNumber{get;set;}
}

