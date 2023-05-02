using Microsoft.EntityFrameworkCore;
using SellsAPI.Models;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace SellsAPI.Contexts;
public class SellsContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public SellsContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public DbSet<Sell> Sells { get; set; }
    public DbSet<Billing> Billings { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Sell>(entity =>
        {
            entity.HasKey(e => e.SellId);
            entity.Property(e => e.PurchaseId);
            entity.Property(e => e.MerchantId);
            entity.Property(e => e.TruckId);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.TotalAmount);
            entity.Property(e => e.Date);

            modelBuilder.Entity<Sell>().ToTable("sells");
        });
        modelBuilder.Entity<Billing>(entity =>
{
    entity.HasKey(e => e.BillId);
    entity.Property(e => e.SellId);
    entity.Property(e => e.FreightCharges);
    entity.Property(e => e.LabourCharges);
    entity.Property(e => e.TotalCharges);
    entity.Property(e => e.Date);

    modelBuilder.Entity<Billing>().ToTable("sells_billing");
});
    }
}