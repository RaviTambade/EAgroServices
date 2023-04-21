using System.Diagnostics;
using System.Reflection.Emit;
using CategoriesAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace CategoriesAPI.Contexts;
using Microsoft.EntityFrameworkCore;
public class CategoryContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public CategoryContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Category> Categories{get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Category>(entity=>{
            entity.HasKey(e=>e.CategoryId);
            entity.Property(e=>e.CategoryTitle);
            entity.Property(e=>e.Description);
            entity.Property(e=>e.ImageUrl);
        });
        modelBuilder.Entity<Category>().ToTable("categories");
    }
}