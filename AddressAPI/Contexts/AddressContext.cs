using Microsoft.EntityFrameworkCore;
using AddressAPI.Models;
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
    }
}  
