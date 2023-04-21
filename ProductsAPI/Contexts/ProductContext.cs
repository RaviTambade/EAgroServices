using System.Diagnostics;
using System.Reflection.Emit;
using ProductsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace ProductsAPI.Contexts;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.Models;

public class ProductContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public ProductContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Product> Products{get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>(entity=>{
            entity.HasKey(e=>e.ProductId);
            entity.Property(e=>e.ProductTitle);
            entity.Property(e=>e.Description);
            entity.Property(e=>e.StockAvailable);
            entity.Property(e=>e.UnitPrice);
            entity.Property(e=>e.ImageUrl);
            entity.Property(e=>e.CategoryId);
            entity.Property(e=>e.DealerId);

        });
        modelBuilder.Entity<Product>().ToTable("products");
    }
}