using System.ComponentModel.DataAnnotations.Schema;

using System.Diagnostics.Tracing;

namespace RateApi.Models;
public class Rate{
    [Column("id")]
    public int Id{get;set;}
    [Column("variety_id")]
    public int VarietyId{get;set;}
    [Column("rate")]
    public int Rates{get;set;}

}