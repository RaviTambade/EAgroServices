using VarietiesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace VarietiesAPI.Contexts;
public class VarietyContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public VarietyContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Variety> Variety { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Variety>(entity =>
        {
            entity.HasKey(e => e.VarietyId);
            entity.Property(e => e.VarietyName);
            entity.Property(e => e.Rate);
            modelBuilder.Entity<Variety>().ToTable("varieties");
        });

    }
    }