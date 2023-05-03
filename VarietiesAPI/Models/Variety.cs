using System.ComponentModel.DataAnnotations.Schema;

namespace VarietiesAPI.Models;
public class Variety{
    [Column("variety_id")]
    public int VarietyId{get;set;}
    [Column("variety_name")]
    public string VarietyName{get;set;}
}