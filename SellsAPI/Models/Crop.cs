using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Variety
{
    [Column("id")]
    public int Id { get; set; }

    [Column("cropname")]
    public string? CropName { get; set; }
}