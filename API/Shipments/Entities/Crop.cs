using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.Shipments.Entities;

[Table("crops")]
public class Crop
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("imageurl")]
    public string? ImageUrl { get; set; }

    [Column("rate")]
    public double Rate { get; set; }
}
