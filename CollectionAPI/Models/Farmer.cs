using System.ComponentModel.DataAnnotations.Schema;
namespace CollectionAPI.Models;
public class Farmer
{
    [Column("id")]
    public int Id { get; set; }
    [Column("firstname")]
    public string? FirstName { get; set; }

    [Column("lastname")]
    public string? LastName { get; set; }

    [Column("location")]
    public string? Location { get; set; }
    [Column("contact_number")]
    public string? ContactNumber { get; set; }
    [Column("password")]
    public string? Password { get; set; }
    [Column("imageurl")]
    public string ImageUrl{get;set;}
    [Column("aadharid")]
    public string AadharId{get;set;}
}