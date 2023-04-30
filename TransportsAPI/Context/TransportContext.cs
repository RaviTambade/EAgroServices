using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;
namespace TransportsAPI.Context;
public class TransportContext : DbContext
{
    private IConfiguration _configuration;
    private string _conString;

    public TransportContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Transport> Transports { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //  string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";  
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Transport>(entity =>
        {
            entity.HasKey(e => e.TransportId);
            entity.Property(e => e.OfficeName);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Transport>().ToTable("transports");
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

