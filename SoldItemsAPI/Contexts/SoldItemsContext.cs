using SoldItemsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace SoldItemsAPI.Context;
public class SoldItemsContext:DbContext
{
  private readonly IConfiguration _configuration;
  private readonly string _conString;

  public SoldItemsContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
  }
public DbSet<SoldItems> SoldItems {get;set;}
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<SoldItems>(entity => 
        {
          entity.HasKey(e => e.SellId);
          entity.Property(e => e.PurchaseId);
          entity.Property(e => e.ConsigneeId);
          entity.Property(e => e.TransportId);
          entity.Property(e => e.NetWeight);
          entity.Property(e => e.RatePerKg);
          entity.Property(e => e.TotalAmount);
                // .HasColumnType("double")
                // .HasComputedColumnSql("rate_per_kg * net_weight");
          entity.Property(e => e.Date);
          modelBuilder.Entity<SoldItems>().ToTable("solditems");
        });

}

 }




