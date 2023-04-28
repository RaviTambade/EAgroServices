using Microsoft.EntityFrameworkCore;
using FarmersAPI.Models;
namespace FarmersAPI.Contexts;
public class FarmersContext : DbContext // Defines a DbContext called FarmersContext
{
    private readonly IConfiguration _configuration;  // Stores an instance of IConfiguration
    private readonly string _conString;  // Stores a connection string

    public FarmersContext(IConfiguration configuration)  //// Constructor that takes an IConfiguration parameter
    {
    _configuration=configuration;
    _conString=this._configuration.GetConnectionString("DefaultConnection");   // // Retrieves the connection string from the configuration and assigns it to the instance variable
    }
    public DbSet<Farmer> Farmers { get; set; }   // Represents a collection of Farmer entities in the context
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)   // Configures the context options
    {
        optionsBuilder.UseMySQL(_conString);    // Sets the connection string to be used by the context
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) // Defines the model for the context
    {
        base.OnModelCreating(modelBuilder);     // Calls the base implementation
        modelBuilder.Entity<Farmer>(entity =>     // Configures the Farmer entity
        { 
            entity.HasKey(e => e.FarmerId);      // Defines the primary key
            entity.Property(e => e.FirstName);   // Defines a property 
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
        });
        modelBuilder.Entity<Farmer>().ToTable("farmers");  // Maps the Farmer entity to a table named "farmers"
    }
}