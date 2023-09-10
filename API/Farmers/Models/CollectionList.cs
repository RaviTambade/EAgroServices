using System.ComponentModel.DataAnnotations.Schema;
namespace Transflower.EAgroServices.Farmers.Models;
public class CollectionList
{
    public int Id { get; set; }
    public string? CropName { get; set; }
    public int Quantity { get; set; }
    public DateTime CollectionDate { get; set; }
}

