using MerchantsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace MerchantsAPI.Context;
public class MerchantContext:DbContext
{
  private readonly IConfiguration _configuration;
  private readonly string _conString;

  public MerchantContext(IConfiguration configuration){
    _configuration=configuration;
    _conString=_configuration.GetConnectionString("DefaultConnection");
  }
public DbSet<Merchant> Merchants {get;set;}
 public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Merchant>(entity => 
        {
          entity.HasKey(e => e.MerchantId);
          entity.Property(e => e.FirstName);
          entity.Property(e => e.LastName);
          entity.Property(e => e.CompanyName);
          entity.Property(e => e.Location);
          entity.Property(e => e.UserId);
          modelBuilder.Entity<Merchant>().ToTable("produce_merchants");
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
           entity.HasKey(e=> e.UserRoleId);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("user_roles");
       });

}

}


