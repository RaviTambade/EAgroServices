using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;

namespace TransportsAPI.Context;

public class TransportContext : DbContext
{

    public DbSet<Transport> Transports { get; set; }
      private IConfiguration _configuration;
    private string _conString;

    public TransportContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
         
        // string conString = "server=localhost; database=Ecommerce; user=root; password=password";
        optionsBuilder.UseMySQL(_conString);
    }
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";
    //     optionsBuilder.UseMySQL(conString);
    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Transport>(entity =>
        {
            entity.HasKey(e => e.TruckNumber);
            entity.Property(e => e.OwnerName);
            entity.Property(e => e.OfficeName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.AccountNumber);
            entity.Property(e => e.IFSCCode);
            entity.Property(e => e.Location);
        });
        modelBuilder.Entity<Transport>().ToTable("transports");
    }
}