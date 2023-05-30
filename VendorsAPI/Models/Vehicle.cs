using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class Vehicle{
    [Column("id")]
    public int Id{get;set;}
    [Column("transportid")]
    public int VendorId{get;set;}
    [Column("vehiclenumber")]
    public string? VehicleNumber{get;set;}
}

