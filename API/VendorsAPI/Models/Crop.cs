using System.ComponentModel.DataAnnotations.Schema;

namespace VendorsAPI.Models;
public class Crop{
    [Column("id")]
    public int Id{get;set;}
    [Column("title")]
    public string? CropTitle{get;set;}
    [Column("imageurl")]
    public string ImageUrl{get;set;}
    [Column("rate")]
    public double Rate { get; set; }
}