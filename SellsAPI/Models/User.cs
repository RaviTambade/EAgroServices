using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class User
{
    [Column("id")]
    public int Id { get; set; }
      [Column("firstname")]
    public string? FirstName { get; set; }
    [Column("lastname")]
    public string? LastName { get; set; }
    [Column("location")]
    public string? Location { get; set; }
    [Column("contactnumber")]
    public string? ContactNumber { get; set; }
    [Column("password")]
    public string? Password { get; set; }
}
