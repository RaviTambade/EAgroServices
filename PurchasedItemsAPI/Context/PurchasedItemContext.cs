using Microsoft.EntityFrameworkCore;
using PurchasedItemsAPI.Models;

namespace PurchasedItemsAPI.Context;

public class PurchasedItemContext : DbContext
{

    public DbSet<PurchasedItem> PurchasedItems { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";
        optionsBuilder.UseMySQL(conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<PurchasedItem>(entity =>
        {
            entity.HasKey(e => e.PurchaseId);
            entity.Property(e => e.FarmerId);
            entity.Property(e => e.Variety);
            entity.Property(e => e.Bags);
            entity.Property(e => e.TotalWeight);
            entity.Property(e => e.TareWeight);
            entity.Property(e => e.NetWeight);
            entity.Property(e => e.RatePerKg);
            entity.Property(e => e.LabourCharges);
            entity.Property(e => e.TotalAmount);
            entity.Property(e => e.Date);
        });
        modelBuilder.Entity<PurchasedItem>().ToTable("purchasedItems");
    }
}