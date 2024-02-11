using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("crops")]
public class Crop
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? ImageUrl { get; set; }
    public double Rate { get; set; }
}
