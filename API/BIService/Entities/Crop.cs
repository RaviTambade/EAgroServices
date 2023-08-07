using System.ComponentModel.DataAnnotations.Schema;

namespace BIService.Entities;

public class Crop
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = string.Empty;

    [Column("imageurl")]
    public string ImageUrl { get; set; } = string.Empty;

    [Column("rate")]
    public double Rate { get; set; }
}
