using AuthAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace AuthAPI.Context;
public class UserContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public UserContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Farmer> Farmers { get; set; }
    public DbSet<Admin> Admin { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<Transport> Transports { get; set; }

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
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            modelBuilder.Entity<User>().ToTable("users");
        });

        modelBuilder.Entity<Role>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.RoleName);
           modelBuilder.Entity<Role>().ToTable("roles");
       });

        modelBuilder.Entity<UserRole>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("user_roles");
       });
        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Farmer>().ToTable("farmers");
        });
        modelBuilder.Entity<Admin>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.FirstName);
           entity.Property(e => e.LastName);
           entity.Property(e => e.Location);
           entity.Property(e => e.UserId);
           modelBuilder.Entity<Admin>().ToTable("admins");
       });
        modelBuilder.Entity<Employee>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.FirstName);
           entity.Property(e => e.LastName);
           entity.Property(e => e.Location);
           entity.Property(e => e.Salary);
           entity.Property(e => e.UserId);
           modelBuilder.Entity<Employee>().ToTable("employees");
       });
        modelBuilder.Entity<Merchant>(entity =>
     {
         entity.HasKey(e => e.Id);
         entity.Property(e => e.FirstName);
         entity.Property(e => e.LastName);
         entity.Property(e => e.CompanyName);
         entity.Property(e => e.Location);
         entity.Property(e => e.UserId);
         modelBuilder.Entity<Merchant>().ToTable("merchants");
     });
        modelBuilder.Entity<Transport>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.OfficeName);
           entity.Property(e => e.FirstName);
           entity.Property(e => e.LastName);
           entity.Property(e => e.Location);
           entity.Property(e => e.UserId);
           modelBuilder.Entity<Transport>().ToTable("transports");
       });
    }
}
