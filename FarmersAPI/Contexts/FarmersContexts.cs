using Microsoft.EntityFrameworkCore;
using FarmersAPI.Models;
using Microsoft.AspNetCore.Identity;
namespace FarmersAPI.Contexts;
public class FarmersContext : DbContext // Defines a DbContext called FarmersContext
{
    private readonly IConfiguration _configuration;  // Stores an instance of IConfiguration
    private readonly string _conString;  // Stores a connection string
    public FarmersContext(IConfiguration configuration)  // Constructor that takes an IConfiguration parameter
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");   // Retrieves the connection string from the configuration and assigns it to the instance variable
    }
    public DbSet<Farmer> Farmers { get; set; }   // Represents a collection of Farmer entities in the context
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)   // Configures the context options
    {
        optionsBuilder.UseMySQL(_conString);    // Sets the connection string to be used by the context
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) // Defines the model for the context
    {
        base.OnModelCreating(modelBuilder);     // Calls the base implementation
        modelBuilder.Entity<Farmer>(entity =>     // Configures the Farmer entity
        {
            entity.HasKey(e => e.FarmerId);      // Defines the primary key of farmer
            entity.Property(e => e.FirstName);   // Defines a property 
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Farmer>().ToTable("farmers");  // Maps the Farmer entity to a table named "farmers"
        });
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            modelBuilder.Entity<User>().ToTable("users");
        });
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId);
            entity.Property(e => e.RoleId);
            modelBuilder.Entity<UserRole>().ToTable("user_roles");
        });
    }
}