using System.ComponentModel.DataAnnotations.Schema;
namespace VendorsAPI.Models;
public class UserRole{
     [Column("id")]
    public int Id { get; set; }

    [Column("userid")]
    public int UserId { get; set; }

    [Column("roleid")]
    public int RoleId { get; set; }

}