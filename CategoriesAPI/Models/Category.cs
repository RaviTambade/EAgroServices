using System.ComponentModel.DataAnnotations.Schema;
namespace CategoriesAPI.Models;
public class Category{

    [Column("category_id")]
    public int CategoryId{get;set;}

    [Column("category_title")]
    public string? CategoryTitle{get;set;}

    [Column("description")]
    public string? Description{get;set;}

    [Column("imageUrl")]
    public string? ImageUrl{get;set;}
}