using System.ComponentModel.DataAnnotations.Schema;
namespace MerchantsAPI.Models;
public class Crop
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? CropName { get; set; }
}