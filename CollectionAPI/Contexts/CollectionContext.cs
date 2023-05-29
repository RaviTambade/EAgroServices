using CollectionAPI.Models;
using Microsoft.EntityFrameworkCore;
using CollectionAPI.Models;

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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
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
            modelBuilder.Entity<Farmer>().ToTable("users");
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });
    }
}
