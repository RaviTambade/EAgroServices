using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RateApi.Models;
namespace RateApi.Contexts;
public class RatesContext : DbContext
{
    private readonly IConfiguration _configuration;  // Stores an instance of IConfiguration
    private readonly string _conString;  // Stores a connection string
    public RatesContext(IConfiguration configuration)  // Constructor that takes an IConfiguration parameter
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");   // Retrieves the connection string from the configuration and assigns it to the instance variable
    }
    public DbSet<Rate> Rates { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)   // Configures the context options
    {
        optionsBuilder.UseMySQL(_conString);    // Sets the connection string to be used by the context
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) // Defines the model for the context
    {
         base.OnModelCreating(modelBuilder);     // Calls the base implementation
        modelBuilder.Entity<Rate>(entity =>     // Configures the Rate entity
        {
            entity.HasKey(e => e.Id);      // Defines the primary key of id
            entity.Property(e => e.VarietyId);   // Defines a property 
            entity.Property(e => e.Rates);
            modelBuilder.Entity<Rate>().ToTable("rates");  // Maps the Rate entity to a table named "rates"
        });
    }
}
