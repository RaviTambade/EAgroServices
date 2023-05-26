using System.ComponentModel.DataAnnotations.Schema;
namespace AuthAPI.Models;
public class Admin
{
    [Column("admin_id")]
    public int Id { get; set; }
    [Column("First_name")]
    public string FirstName { get; set; }
    [Column("last_name")]
    public string LastName { get; set; }
    [Column("Location")]
    public string Location { get; set; }
    [Column("user_id")]
    public int UserId { get; set; }
}
