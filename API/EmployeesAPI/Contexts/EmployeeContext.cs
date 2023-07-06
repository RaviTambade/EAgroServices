using EmployeesAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace EmployeesAPI.Context;
public class EmployeeContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public EmployeeContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<User> Employees { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Role> Roles { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.AadharId);

            modelBuilder.Entity<User>().ToTable("users");
        });
        modelBuilder.Entity<UserRole>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("userroles");
       });
        modelBuilder.Entity<Role>(entity =>
      {
          entity.HasKey(e => e.Id);
          entity.Property(e => e.Name);
          modelBuilder.Entity<Role>().ToTable("roles");
      });
    }
}

