using MerchantsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace MerchantsAPI.Context;
public class MerchantContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public MerchantContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Merchant> Merchants { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Merchant>(entity =>
       {
           entity.HasKey(e => e.Id);
           entity.Property(e => e.FirstName);
           entity.Property(e => e.LastName);
           entity.Property(e => e.Location);
           entity.Property(e => e.ContactNumber);
           modelBuilder.Entity<Merchant>().ToTable("users");
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
           entity.Property(e => e.RoleName);
           modelBuilder.Entity<Role>().ToTable("roles");
       });
    }
}


