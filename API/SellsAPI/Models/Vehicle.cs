using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Vehicle{
    [Column("id")]
    public int Id{get;set;}
    [Column("vendorid")]
    public int VendorId{get;set;}
    [Column("trucknumber")]
    public string? VehicleNumber{get;set;}
}

