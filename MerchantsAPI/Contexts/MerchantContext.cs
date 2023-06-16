using System.Diagnostics;
using MerchantsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace MerchantsAPI.Context;
public class MerchantContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public MerchantContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<CollectionSell> CollectionSells { get; set; }
    public DbSet<SellBilling> SellBillings { get; set; }
    public DbSet<FreightRate> FreightRates { get; set; }
    public DbSet<Collection> Collections{get;set;}
    public DbSet<Crop> Crops{get;set;}
    public DbSet<Vehicle> Vehicles{get;set;}



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
        optionsBuilder.LogTo(Console.WriteLine,LogLevel.Information);    
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Merchant>(entity =>
       {
            entity.HasKey(e => e.Id);   
             entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.AadharId);
           modelBuilder.Entity<Merchant>().ToTable("users");
       });
        modelBuilder.Entity<UserRole>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("userroles");
       });
        modelBuilder.Entity<Role>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.RoleName);
           modelBuilder.Entity<Role>().ToTable("roles");
       });
       modelBuilder.Entity<CollectionSell>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CollectionId);
            entity.Property(e => e.MerchantId);
            entity.Property(e => e.VehicleId);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.Quantity);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.Date);

            modelBuilder.Entity<CollectionSell>().ToTable("sells");
        });
        modelBuilder.Entity<SellBilling>(entity =>
{
    entity.HasKey(e => e.Id);
    entity.Property(e => e.SellId);
    entity.Property(e => e.FreightCharges);
    entity.Property(e => e.LabourCharges);
    entity.Property(e => e.TotalCharges);
    entity.Property(e => e.TotalAmount);
    entity.Property(e => e.Date);

    modelBuilder.Entity<SellBilling>().ToTable("sellsbilling");
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
          entity.Property(e => e.CropName);
          modelBuilder.Entity<Crop>().ToTable("crops");
      });
       modelBuilder.Entity<Vehicle>(entity =>
      {
          entity.HasKey(e => e.Id);
          entity.HasKey(e => e.TransportId);
          entity.Property(e => e.VehicleNumber);
          modelBuilder.Entity<Vehicle>().ToTable("vehicles");
      });
    }
}


