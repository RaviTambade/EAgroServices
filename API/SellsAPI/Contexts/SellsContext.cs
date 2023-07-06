using Microsoft.EntityFrameworkCore;
using SellsAPI.Models;
namespace SellsAPI.Contexts;
public class SellsContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public SellsContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Sell> Sells { get; set; }
    public DbSet<Billing> Billings { get; set; }
    public DbSet<FreightRate> FreightRates { get; set; }
    public DbSet<Merchant> Merchants {get;set;}
    public DbSet<Vehicle> Vehicle  {get;set;}
    public DbSet<Collections> Collections { get; set; }
    public DbSet<Crop> Crops { get; set; } 


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Sell>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CollectionId);
            entity.Property(e => e.MerchantId);
            entity.Property(e => e.VehicleId);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.Date);

            modelBuilder.Entity<Sell>().ToTable("sells");
        });
        modelBuilder.Entity<Billing>(entity =>
{
    entity.HasKey(e => e.Id);
    entity.Property(e => e.SellId);
    entity.Property(e => e.FreightCharges);
    entity.Property(e => e.LabourCharges);
    entity.Property(e => e.TotalCharges);
    entity.Property(e => e.Date);

    modelBuilder.Entity<Billing>().ToTable("sellsbilling");
});
        modelBuilder.Entity<FreightRate>(entity =>
       {
           entity.HasKey(e => e.BillId);
           entity.Property(e => e.FromDestination);
           entity.Property(e => e.ToDestination);
           entity.Property(e => e.Kilometers);
           entity.Property(e => e.RatePerKm);
           modelBuilder.Entity<FreightRate>().ToTable("freightrates");
       });
        modelBuilder.Entity<Merchant>(entity =>
               {
                   entity.HasKey(e => e.Id);
                   entity.Property(e => e.FirstName);
                   entity.Property(e => e.LastName);
                   entity.Property(e => e.Location);
                   modelBuilder.Entity<Merchant>().ToTable("users");
               });
        modelBuilder.Entity<Vehicle>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.VendorId);
           entity.Property(e => e.VehicleNumber);
           modelBuilder.Entity<Vehicle>().ToTable("vendors");
       });

       modelBuilder.Entity<Collections>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FarmerId);
            entity.Property(e => e.CropId);
            entity.Property(e => e.ContainerType);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.Grade);
            entity.Property(e => e.TotalWeight);
            entity.Property(e => e.TareWeight);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            modelBuilder.Entity<Collections>().ToTable("collections");
        });
          modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });
    }
}