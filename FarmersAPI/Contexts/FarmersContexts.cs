using Microsoft.EntityFrameworkCore;
using FarmersAPI.Models;
using Microsoft.Extensions.Configuration;
namespace FarmersAPI.Contexts;
public class FarmersContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public FarmersContext(IConfiguration configuration)
    {
    _configuration=configuration;
    _conString=this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Farmer> Farmers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.FarmerId);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.Location);
            entity.Property(e => e.CreditBalance);
            entity.Property(e => e.DebitBalance);
            entity.Property(e => e.TotalBalance);
        });
        modelBuilder.Entity<Farmer>().ToTable("farmers");
    }
}