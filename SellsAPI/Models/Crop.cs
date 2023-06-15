using System.ComponentModel.DataAnnotations.Schema;
namespace SellsAPI.Models;
public class Crop
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }
}