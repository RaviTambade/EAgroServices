using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Variety
{
    [Column("variety_id")]
    public int Id { get; set; }

    [Column("variety_name")]
    public string? VarietyName { get; set; }
}