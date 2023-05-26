using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;
namespace TransportsAPI.Context;
public class TruckContext : DbContext
{
    private IConfiguration _configuration;
    private string _conString;

    public TruckContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Truck> Truck { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //  string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";  
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Truck>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.TransportId);
            entity.Property(e => e.TruckNumber);
            modelBuilder.Entity<Truck>().ToTable("transport_trucks");
        });
  
    }
}