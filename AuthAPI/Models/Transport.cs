using System.ComponentModel.DataAnnotations.Schema;
namespace AuthAPI.Models;
public class Transport
{
    [Column("transport_id")]
    public int Id { get; set; }
    [Column("office_name")]
    public string? OfficeName { get; set; }
    [Column("first_name")]
    public string? FirstName { get; set; }
    [Column("last_name")]
    public string? LastName { get; set; }
    [Column("location")]
    public string? Location { get; set; }
    [Column("user_id")]
    public int UserId { get; set; }
}