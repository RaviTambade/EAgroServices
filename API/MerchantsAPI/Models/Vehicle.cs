using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class Vehicle{
      [Column("id")]
    public int Id{get;set;}
    [Column("transportid")]
    public int TransportId{get;set;}
    [Column("vehiclenumber")]
    public string? VehicleNumber{get;set;}
}