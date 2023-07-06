using System.ComponentModel.DataAnnotations.Schema;
namespace AuthAPI.Models;
public class Role
{
    [Column("id")]
    public int Id { get; set; }
    [Column("name")]
    public string? RoleName { get; set; }
}