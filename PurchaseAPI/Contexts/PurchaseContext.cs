using PurchaseAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PurchaseAPI.Contexts;
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<PurchaseItem>(entity =>
        {
            entity.HasKey(e => e.PurchaseId);
            entity.Property(e => e.FarmerId);
            entity.Property(e => e.Variety);
            entity.Property(e => e.ContainerType);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.TotalWeight);
            entity.Property(e => e.TareWeight);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            modelBuilder.Entity<PurchaseItem>().ToTable("farmer_purchases");
        });

         modelBuilder.Entity<PurchaseBilling>(entity =>
        {
            entity.HasKey(e => e.BillId);
            entity.Property(e => e.PurchaseId);
            entity.Property(e => e.LabourCharges);
            entity.Property(e => e.TotalAmount);
            modelBuilder.Entity<PurchaseBilling>().ToTable("farmer_purchases_billing");
        });
             modelBuilder.Entity<Farmer>(entity =>     
        {
            entity.HasKey(e => e.FarmerId);      
            entity.Property(e => e.FirstName);   
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Farmer>().ToTable("farmers"); 
        });
    }
}

