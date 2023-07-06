using Microsoft.EntityFrameworkCore;
using VendorsAPI.Models;
namespace VendorsAPI.Context;
public class VendorsContext : DbContext
{
    private IConfiguration _configuration;
    private string _conString;

    public VendorsContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Vendor> Vendors { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Sell> Sells { get; set; }
    public DbSet<FreightRate> FreightRates { get; set; }
    public DbSet<SellsBilling> SellsBillings { get; set; }
    public DbSet<Transport> Transports { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    public DbSet<Collection> Collections { get; set; }
    public DbSet<Crop> Crops { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
        optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Vendor>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CompanyName);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.TransportId);
            modelBuilder.Entity<Vendor>().ToTable("vendors");
        });
        modelBuilder.Entity<Transport>(entity =>
       {
           entity.HasKey(e => e.Id);   
             entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.AadharId);
           modelBuilder.Entity<Transport>().ToTable("users");
       });
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId);
            entity.Property(e => e.RoleId);
            modelBuilder.Entity<UserRole>().ToTable("userroles");
        });
        modelBuilder.Entity<Vehicle>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.VendorId);
           entity.Property(e => e.VehicleNumber);
           entity.Property(e => e.ImageUrl);

           modelBuilder.Entity<Vehicle>().ToTable("vehicles");
       });
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
        modelBuilder.Entity<FreightRate>(entity =>
   {
       entity.HasKey(e => e.Id);
       entity.Property(e => e.FromDestination);
       entity.Property(e => e.ToDestination);
       entity.Property(e => e.Kilometers);
       entity.Property(e => e.RatePerKm);
       modelBuilder.Entity<FreightRate>().ToTable("freightrates");
   });
        modelBuilder.Entity<SellsBilling>(entity =>
{
    entity.HasKey(e => e.Id);
    entity.Property(e => e.SellId);
    entity.Property(e => e.FreightCharges);
    entity.Property(e => e.LabourCharges);
    entity.Property(e => e.TotalCharges);
    entity.Property(e => e.TotalAmount);
    entity.Property(e => e.Date);
    modelBuilder.Entity<SellsBilling>().ToTable("sellsbilling");

});
   modelBuilder.Entity<Collection>(entity =>
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
            entity.Property(e => e.Date);
            modelBuilder.Entity<Collection>().ToTable("collections");
        });
          modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CropTitle);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.Rate);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });
    }
}
