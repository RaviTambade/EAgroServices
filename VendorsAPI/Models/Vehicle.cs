using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class Vehicle{
    [Column("id")]
    public int Id{get;set;}
    [Column("vendorid")]
    public int VendorId{get;set;}
    [Column("vehiclenumber")]
    public string? VehicleNumber{get;set;}
}

