using Microsoft.EntityFrameworkCore;
using FarmersAPI.Models;

namespace FarmersAPI.Contexts;
public class FarmersContext : DbContext
{
    public DbSet<Farmer> Farmers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string conString = "server=localhost;port=3306;user=root;password=password;database=eagroservicesdb";
        optionsBuilder.UseMySQL(conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.FarmerId);
            entity.Property(e => e.FarmerName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.Password);
            entity.Property(e => e.Location);
            entity.Property(e => e.AccountNumber);
            entity.Property(e => e.IFSCCode);
            entity.Property(e => e.CreditBalance);
            entity.Property(e => e.DebitBalance);
            entity.Property(e => e.TotalBalance);
        });
        modelBuilder.Entity<Farmer>().ToTable("farmers");
    }
}