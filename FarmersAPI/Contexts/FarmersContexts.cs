using Microsoft.EntityFrameworkCore;
using FarmersAPI.Models;
using Microsoft.AspNetCore.Identity;
namespace FarmersAPI.Contexts;
public class FarmersContext : DbContext 
{
    private readonly IConfiguration _configuration;  
    private readonly string _conString;  
    public FarmersContext(IConfiguration configuration)  
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");  
    }
    public DbSet<Farmer> Farmers { get; set; }   
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Role> Roles { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)  
    {
        optionsBuilder.UseMySQL(_conString);    
        optionsBuilder.LogTo(Console.WriteLine,LogLevel.Information);    
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);    
        modelBuilder.Entity<Farmer>(entity =>     
        {
            entity.HasKey(e => e.Id);      
            entity.Property(e => e.FirstName);   
            entity.Property(e => e.LastName);
            entity.Property(e => e.Location);
            entity.Property(e => e.ContactNumber);
            modelBuilder.Entity<Farmer>().ToTable("users"); 
        });
           modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name);
            modelBuilder.Entity<UserRole>().ToTable("roles");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UserId);
            entity.Property(e => e.RoleId);
            modelBuilder.Entity<UserRole>().ToTable("userroles");
        });
    }
}