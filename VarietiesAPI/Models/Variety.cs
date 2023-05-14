using System.ComponentModel.DataAnnotations.Schema;

namespace VarietiesAPI.Models;
public class Variety{
    [Column("variety_id")]
    public int VarietyId{get;set;}
    [Column("variety_name")]
    public string? VarietyName{get;set;}
    [Column("image_url")]
    public string ImageUrl{get;set;}
    [Column("rate")]
    public double Rate { get; set; }
}