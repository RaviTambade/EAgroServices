using System.Diagnostics;
using PaymentAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace PaymentAPI.Context;
public class PaymentContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public PaymentContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Payment> Payments { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
        optionsBuilder.LogTo(Console.WriteLine,LogLevel.Information);    
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Payment>(entity =>
       {
            entity.HasKey(e => e.Id);   
             entity.Property(e => e.TransactionId);
            entity.Property(e => e.BillId);
            entity.Property(e => e.Date);
           modelBuilder.Entity<Payment>().ToTable("payments");
       });
    }
}


