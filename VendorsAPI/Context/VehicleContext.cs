using Microsoft.EntityFrameworkCore;
using VendorsAPI.Models;
namespace VendorsAPI.Context;
public class VehicleContext : DbContext
{
    private IConfiguration _configuration;
    private string _conString;

    public VehicleContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Vehicle> Vehicles { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //  string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";  
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.VendorId);
            entity.Property(e => e.VehicleNumber);
            modelBuilder.Entity<Vehicle>().ToTable("vehicles");
        });
  
    }
}