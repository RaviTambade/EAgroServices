using System.ComponentModel.DataAnnotations.Schema;

namespace AuthAPI.Models;

public class UserRole
{
    [Column("id")]
    public int UserRoleId { get; set; }
    
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("role_id")]
    public int RoleId { get; set; }
}
