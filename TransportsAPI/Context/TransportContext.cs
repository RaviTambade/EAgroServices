using Microsoft.EntityFrameworkCore;
using TransportsAPI.Models;

namespace TransportsAPI.Context;

public class TransportContext : DbContext
{

    public DbSet<Transport> Transports { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";
        optionsBuilder.UseMySQL(conString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Transport>(entity =>
        {
            entity.HasKey(e => e.TruckNumber);
            entity.Property(e => e.OwnerName);
            entity.Property(e => e.OfficeName);
            entity.Property(e => e.ContactNumber);
            entity.Property(e => e.AccountNumber);
            entity.Property(e => e.IFSCCode);
            entity.Property(e => e.Location);
        });
        modelBuilder.Entity<Transport>().ToTable("transports");
    }
}