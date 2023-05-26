using Microsoft.EntityFrameworkCore;
using PurchasingAPI.Models;

namespace PurchasingAPI.Contexts;
public class PurchaseContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public PurchaseContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<PurchaseItem> PurchaseItems { get; set; }
    public DbSet<PurchaseBilling> PurchaseBillings { get; set; }
    public DbSet<Farmer> Farmers { get; set; }
    public DbSet<Variety> Varieties { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<PurchaseItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FarmerId);
            entity.Property(e => e.VarietyId);
            entity.Property(e => e.ContainerType);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.Grade);
            entity.Property(e => e.TotalWeight);
            entity.Property(e => e.TareWeight);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.Date);
            modelBuilder.Entity<PurchaseItem>().ToTable("farmer_purchases");
        });

        modelBuilder.Entity<PurchaseBilling>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.PurchaseId);
           entity.Property(e => e.LabourCharges);
           entity.Property(e => e.TotalAmount);
           entity.Property(e => e.Date);
           modelBuilder.Entity<PurchaseBilling>().ToTable("farmer_purchases_billing");
       });
        modelBuilder.Entity<Farmer>(entity =>
   {
       entity.HasKey(e => e.Id);
       entity.Property(e => e.FirstName);
       entity.Property(e => e.LastName);
       entity.Property(e => e.Location);
       entity.Property(e => e.UserId);
       modelBuilder.Entity<Farmer>().ToTable("farmers");
   });

        modelBuilder.Entity<Variety>(entity =>
      {
          entity.HasKey(e => e.Id);
          entity.Property(e => e.VarietyName);
          modelBuilder.Entity<Variety>().ToTable("varieties");
      });
    }
}