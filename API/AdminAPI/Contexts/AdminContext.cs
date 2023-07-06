using AdminAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace AdminAPI.Context;
public class AdminContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public AdminContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Admin> Admin { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Admin>().ToTable("admins");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);   
             entity.Property(e => e.FirstName);
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.ImageUrl);
            entity.Property(e => e.AadharId);
            modelBuilder.Entity<User>().ToTable("users");
        });
        modelBuilder.Entity<UserRole>(entity =>
       {
           entity.HasKey(e=> e.UserRoleId);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("user_roles");
       });
    }
}

