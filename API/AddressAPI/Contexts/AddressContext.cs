using Microsoft.EntityFrameworkCore;
using AddressAPI.Models;
using System.Diagnostics;

namespace AddressAPI.Contexts;
public class AddressContext : DbContext 
{
    private readonly IConfiguration _configuration;  
    private readonly string _conString;  
    public AddressContext(IConfiguration configuration)  
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");  
    }
    public DbSet<Address> Addresses { get; set; } 
    public DbSet<User> Users{get;set;}
     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)  
    {
        optionsBuilder.UseMySQL(_conString);    
        optionsBuilder.LogTo(Console.WriteLine,LogLevel.Information);    
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);    
        modelBuilder.Entity<Address>(entity =>     
        {
             entity.HasKey(e => e.Id);   
             entity.Property(e => e.State);
            entity.Property(e => e.District);
            entity.Property(e => e.Tahsil);
            entity.Property(e => e.Village);
            entity.Property(e => e.UserId);
            modelBuilder.Entity<Address>().ToTable("addresses"); 
        });
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

    }
}  
