using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.Invoices.Entities;
[Table("crops")]

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
