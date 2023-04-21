using System.Diagnostics;
using System.Reflection.Emit;
using DealersAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DealersAPI.Models;
namespace DealersAPI.Contexts;
public class DealerContext:DbContext{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public DealerContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Dealer> Dealers{get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Dealer>(entity=>{
            entity.HasKey(e=>e.DealerId);
            entity.Property(e=>e.FirstName);
            entity.Property(e=>e.LastName);
            entity.Property(e=>e.CompanyName);
            entity.Property(e=>e.ContactNumber);
            entity.Property(e=>e.Location);
        });
        modelBuilder.Entity<Dealer>().ToTable("dealers");
    }
}