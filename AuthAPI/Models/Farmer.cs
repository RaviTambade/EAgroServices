using System.ComponentModel.DataAnnotations.Schema;
namespace AuthAPI.Models;
public class Farmer
{
    [Column("farmer_id")]
    public int FarmerId { get; set; }

    [Column("first_name")]
    public string? FirstName { get; set; }

     [Column("last_name")]
    public string? LastName { get; set; }
    
    [Column("location")]
    public string? Location { get; set; }

     [Column("user_id")]
    public int UserId { get; set; }

}