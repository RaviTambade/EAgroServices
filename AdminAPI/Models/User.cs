using System.ComponentModel.DataAnnotations.Schema;
namespace AdminAPI.Models;
public class User
{
    [Column("user_id")]
    public int Id { get; set; }
    [Column("contact_number")]
    public string? ContactNumber { get; set; }
    [Column("password")]
    public string? Password { get; set; }
}
