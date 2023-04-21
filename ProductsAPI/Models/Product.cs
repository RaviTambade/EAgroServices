using System.ComponentModel.DataAnnotations.Schema;
namespace ProductsAPI.Models;
public class Product{

    [Column("product_id")]
    public int ProductId{get;set;}

    [Column("product_title")]
    public string? ProductTitle{get;set;}

    [Column("description")]
    public string? Description{get;set;}

     [Column("stock_available")]
    public string? StockAvailable{get;set;}

     [Column("unit_price")]
    public string? UnitPrice{get;set;}

    [Column("imageUrl")]
    public string? ImageUrl{get;set;}

    [Column("category_id")]
    public string? CategoryId{get;set;}

    [Column("dealer_id")]
    public string? DealerId{get;set;}


}