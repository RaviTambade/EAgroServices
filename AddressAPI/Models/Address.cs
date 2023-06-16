using System.ComponentModel.DataAnnotations.Schema;

namespace AddressAPI.Models;

public class Address{
    [Column("id")]
    public int Id{get;set;}
    [Column("state")]
    public string State{get;set;}
    [Column("district")]
    public string District{get;set;}
    [Column("taluka")]
    public string Taluka{get; set;}
    [Column("village")]
    public string Village{get;set;}

    [Column("userid")]
    public int UserId{get;set;}
}