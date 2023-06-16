using CollectionAPI.Models;
using Microsoft.EntityFrameworkCore;
using CollectionAPI.Models;
using System.Diagnostics;

namespace CollectionAPI.Contexts;

public class CollectionContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public CollectionContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }

    public DbSet<Collection> Collections { get; set; }
    public DbSet<Billing> Billings { get; set; }
    public DbSet<Farmer> Farmers { get; set; }
    public DbSet<Crop> Crops     { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Merchant> Merchants { get; set; }

    public DbSet<Sell> Sells{get;set;}


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
        optionsBuilder.LogTo(Console.WriteLine,LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
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

        modelBuilder.Entity<Billing>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CollectionId);
            entity.Property(e => e.LabourCharges);
            entity.Property(e => e.TotalAmount);
            entity.Property(e => e.Date);
            modelBuilder.Entity<Billing>().ToTable("billing");
        });
        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.Id);   
             entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.AadharId);
            modelBuilder.Entity<Farmer>().ToTable("users");
        });
           modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name);
            modelBuilder.Entity<UserRole>().ToTable("roles");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId);
            entity.Property(e => e.RoleId);
            modelBuilder.Entity<UserRole>().ToTable("userroles");
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });
         modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.VendorId);
            entity.Property(e => e.VehicleNumber);
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
    }
}
