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
    public DbSet<Merchant> Merchants{get;set;}
    public DbSet<Truck> Trucks{get;set;}
    public DbSet<PurchaseItem> PurchaseItems { get; set; }
    public DbSet<Variety> Varieties { get; set; } 


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Sell>(entity =>
        {
            entity.HasKey(e => e.SellId);
            entity.Property(e => e.PurchaseId);
            entity.Property(e => e.MerchantId);
            entity.Property(e => e.TruckId);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.TotalAmount);
            entity.Property(e => e.Date);

            modelBuilder.Entity<Sell>().ToTable("sells");
        });
        modelBuilder.Entity<Billing>(entity =>
{
    entity.HasKey(e => e.BillId);
    entity.Property(e => e.SellId);
    entity.Property(e => e.FreightCharges);
    entity.Property(e => e.LabourCharges);
    entity.Property(e => e.TotalCharges);
    entity.Property(e => e.Date);

    modelBuilder.Entity<Billing>().ToTable("sells_billing");
});
        modelBuilder.Entity<FreightRate>(entity =>
       {
           entity.HasKey(e => e.BillId);
           entity.Property(e => e.FromDestination);
           entity.Property(e => e.ToDestination);
           entity.Property(e => e.Kilometers);
           entity.Property(e => e.RatePerKm);
           modelBuilder.Entity<FreightRate>().ToTable("freight_rates");
       });
        modelBuilder.Entity<Merchant>(entity =>
               {
                   entity.HasKey(e => e.MerchantId);
                   entity.Property(e => e.FirstName);
                   entity.Property(e => e.LastName);
                   entity.Property(e => e.CompanyName);
                   entity.Property(e => e.Location);
                   entity.Property(e => e.UserId);
                   modelBuilder.Entity<Merchant>().ToTable("merchants");
               });
        modelBuilder.Entity<Truck>(entity =>
       {
           entity.HasKey(e => e.TruckId);
           entity.Property(e => e.TransportId);
           entity.Property(e => e.TruckNumber);
           modelBuilder.Entity<Truck>().ToTable("transport_trucks");
       });

       modelBuilder.Entity<PurchaseItem>(entity =>
        {
            entity.HasKey(e => e.PurchaseId);
            entity.Property(e => e.FarmerId);
            entity.Property(e => e.VarietyId);
            entity.Property(e => e.ContainerType);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.Grade);
            entity.Property(e => e.TotalWeight);
            entity.Property(e => e.TareWeight);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            modelBuilder.Entity<PurchaseItem>().ToTable("farmer_purchases");
        });
          modelBuilder.Entity<Variety>(entity =>
        {
            entity.HasKey(e => e.VarietyId);
            entity.Property(e => e.VarietyName);
            modelBuilder.Entity<Variety>().ToTable("varieties");
        });
    }
}