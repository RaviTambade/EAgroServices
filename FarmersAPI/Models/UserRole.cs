using System.ComponentModel.DataAnnotations.Schema;
namespace FarmersAPI.Models;
public class UserRole{
     [Column("id")]
    public int Id { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("role_id")]
    public int RoleId { get; set; }

}