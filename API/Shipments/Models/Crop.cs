using System.ComponentModel.DataAnnotations.Schema;

namespace Shipments.Models;

public class Crop
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("imageurl")]
    public string? ImageUrl { get; set; }

    [Column("rate")]
    public double Rate { get; set; }
}
