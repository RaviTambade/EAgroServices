using Microsoft.EntityFrameworkCore;
using Crops.Entities;

namespace Crops.Contexts;
public class CropContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public CropContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }
    public DbSet<Crop> Crops { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.Rate);
            modelBuilder.Entity<Crop>().ToTable("crops");
        });

    }
    }