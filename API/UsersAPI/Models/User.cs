using System.ComponentModel.DataAnnotations.Schema;

namespace UsersAPI.Models;

public class User
{
    [Column("id")]
    public int Id { get; set; }

    [Column("contactnumber")]
    public string? ContactNumber { get; set; }

    [Column("firstname")]
    public string? FirstName { get; set; }

    [Column("lastname")]
    public string? LastName { get; set; }

    [Column("imageurl")]
    public string? ImageUrl { get; set; }

    [Column("aadharid")]
    public string? AadharId { get; set; }

    [Column("password")]
    public string? Password { get; set; }
}
