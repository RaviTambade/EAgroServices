using System.ComponentModel.DataAnnotations.Schema;
namespace CollectionCenters.Models;
public class Crop{
    [Column("id")]
    public int Id { get; set; }
    [Column("title")]
    public string Title { get; set; } = string.Empty;
    [Column("imageurl")]
    public string ImageUrl { get; set; } = string.Empty;
    [Column("rate")]
    public double Rate { get; set; }
}
